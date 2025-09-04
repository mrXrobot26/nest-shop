import { INestApplication, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Endpoint } from './entities/endpoint.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class EndpointService {
  constructor(
    @InjectRepository(Endpoint) private endpointRepository: Repository<Endpoint>,
    private dataSource: DataSource,
  ) {}

  getAllEndpoints(app: INestApplication) {
    const server = app.getHttpAdapter().getInstance();
    const router = server.router;

    const availableRoutes = router.stack
      .map(layer => {
        if (layer.route) {
          return {
            route: {
              path: layer.route?.path,
              method: layer.route?.stack[0].method,
            },
          };
        }
      })
      .filter(item => item !== undefined);

    return availableRoutes;
  }

  async resetEndpointsInDatabase(endpoints: any[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await queryRunner.manager.query('DELETE FROM endpoint');
      await queryRunner.manager.query('ALTER SEQUENCE endpoint_id_seq RESTART WITH 1');

      for (const endpoint of endpoints) {
        const endpointData = {
          path: endpoint.route.path,
          method: endpoint.route.method.toUpperCase(),
        };
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(Endpoint)
          .values(endpointData)
          .execute();
      }
      await queryRunner.commitTransaction();
      return console.log('endpoint table rested and new endpoints saved to db successfully');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error saving endpoints to db:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

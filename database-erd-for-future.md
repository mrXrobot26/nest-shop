# Database Entity Relationship Diagram

```mermaid
erDiagram
    User {
        int id PK
        string email UK
        string password
        string firstName
        string lastName
        boolean emailVerified
        string emailVerificationToken
        string passwordResetToken
        datetime passwordResetExpires
        int failedLoginAttempts
        datetime lockedUntil
        datetime lastLoginAt
        string lastLoginIp
        boolean twoFactorEnabled
        string twoFactorSecret
        datetime createdAt
        datetime updatedAt
    }

    Role {
        int id PK
        string name UK
        string description
        boolean isActive
        datetime createdAt
        datetime updatedAt
    }

    Permission {
        int id PK
        string name UK
        string description
        int roleId FK
        datetime createdAt
        datetime updatedAt
    }

    Endpoint {
        int id PK
        string path
        string method
        string module
        string description
        boolean isActive
        boolean requiresAuth
        string controller
        string action
        json metadata
        datetime createdAt
        datetime updatedAt
    }

    UserRole {
        int userId PK,FK
        int roleId PK,FK
        int assignedBy FK
        datetime assignedAt
        datetime expiresAt
        boolean isActive
        string notes
        datetime createdAt
        datetime updatedAt
    }

    RolePermission {
        int roleId PK,FK
        int permissionId PK,FK
        int assignedBy FK
        datetime assignedAt
        datetime expiresAt
        boolean isActive
        string notes
        datetime createdAt
        datetime updatedAt
    }

    PermissionEndpoint {
        int permissionId PK,FK
        string endpointPath PK
        string endpointMethod PK
        string description
        boolean isActive
        datetime createdAt
        datetime updatedAt
    }

    RefreshToken {
        int id PK
        string token UK
        int userId FK
        datetime expiresAt
        boolean isRevoked
        datetime revokedAt
        string ipAddress
        string userAgent
        datetime createdAt
        datetime updatedAt
    }

    UserSession {
        int id PK
        string sessionId UK
        int userId FK
        string ipAddress
        string userAgent
        string deviceType
        string browser
        string operatingSystem
        string location
        boolean isActive
        datetime lastActivityAt
        datetime expiresAt
        datetime createdAt
        datetime updatedAt
    }

    AuditLog {
        int id PK
        int userId FK
        string action
        string description
        string ipAddress
        string userAgent
        string endpoint
        string httpMethod
        int statusCode
        json metadata
        boolean isSecurityEvent
        datetime createdAt
    }

    %% Relationships
    User ||--o{ UserRole : "has"
    Role ||--o{ UserRole : "assigned to"
    Role ||--o{ Permission : "contains"
    Role ||--o{ RolePermission : "has"
    Permission ||--o{ RolePermission : "belongs to"
    Permission ||--o{ PermissionEndpoint : "controls"
    User ||--o{ RefreshToken : "owns"
    User ||--o{ UserSession : "has"
    User ||--o{ AuditLog : "generates"
    User ||--o{ UserRole : "assigned by"
    User ||--o{ RolePermission : "assigned by"

    %% Composite Key Relationships
    PermissionEndpoint }|--|| Permission : "references"
```

## Key Features

### Security Enhancements
- **Account Security**: Email verification, password reset, failed login tracking, account lockout
- **Two-Factor Authentication**: Support for 2FA with secret storage
- **Session Management**: Refresh tokens and active session tracking with device fingerprinting
- **Audit Logging**: Comprehensive security event tracking

### Permission System
- **Flexible Role-Permission Model**: Many-to-many relationship with audit trails
- **Semantic Endpoint Linking**: Permissions linked to specific endpoint paths and HTTP methods
- **Temporal Permissions**: Support for expiring role and permission assignments

### Data Integrity
- **Composite Primary Keys**: PermissionEndpoint uses (permissionId, endpointPath, endpointMethod)
- **Unique Constraints**: Email, session IDs, refresh tokens
- **Referential Integrity**: Proper foreign key relationships with cascade options

### Performance Optimizations
- **Strategic Indexes**: On frequently queried fields (email, session IDs, tokens)
- **Efficient Queries**: Optimized for common authentication and authorization patterns

### Audit & Compliance
- **Complete Activity Tracking**: All user actions logged with metadata
- **Security Event Monitoring**: Special flagging for security-related events
- **Temporal Data**: Creation and update timestamps on all entities
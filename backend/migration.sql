BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] NVARCHAR(1000) NOT NULL,
    [kekaId] NVARCHAR(1000),
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [passwordHash] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL CONSTRAINT [users_role_df] DEFAULT 'EMPLOYEE',
    [employmentType] NVARCHAR(1000) NOT NULL CONSTRAINT [users_employmentType_df] DEFAULT 'FULLTIME',
    [department] NVARCHAR(1000),
    [designation] NVARCHAR(1000),
    [managerId] NVARCHAR(1000),
    [avatarUrl] NVARCHAR(1000),
    [isActive] BIT NOT NULL CONSTRAINT [users_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [users_kekaId_key] UNIQUE NONCLUSTERED ([kekaId]),
    CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[projects] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [code] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [client] NVARCHAR(1000),
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [projects_status_df] DEFAULT 'ACTIVE',
    [billable] BIT NOT NULL CONSTRAINT [projects_billable_df] DEFAULT 1,
    [startDate] DATETIME2 NOT NULL,
    [endDate] DATETIME2 NOT NULL,
    [budgetHours] FLOAT(53) NOT NULL CONSTRAINT [projects_budgetHours_df] DEFAULT 0,
    [managerId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [projects_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [projects_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [projects_code_key] UNIQUE NONCLUSTERED ([code])
);

-- Create Employee

CREATE TABLE [dbo].[employees] (
    [id] NVARCHAR(1000) NOT NULL,
    [employeeNumber] NVARCHAR(1000) NOT NULL,
    [firstName] NVARCHAR(1000) NOT NULL,
    
    [middleName] NVARCHAR(1000),
    [lastName] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [dateOfBirth] DATETIME2 NOT NULL,
    [gender] NVARCHAR(1000) NOT NULL,
    [dateOfJoining] DATETIME2 NOT NULL
);

-- CreateTable
CREATE TABLE [dbo].[project_members] (
    [id] NVARCHAR(1000) NOT NULL,
    [projectId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [allocation] FLOAT(53) NOT NULL CONSTRAINT [project_members_allocation_df] DEFAULT 100,
    [role] NVARCHAR(1000),
    [startDate] DATETIME2,
    [endDate] DATETIME2,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [project_members_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [project_members_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [project_members_projectId_userId_key] UNIQUE NONCLUSTERED ([projectId],[userId])
);

-- CreateTable
CREATE TABLE [dbo].[tasks] (
    [id] NVARCHAR(1000) NOT NULL,
    [projectId] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [type] NVARCHAR(1000) NOT NULL CONSTRAINT [tasks_type_df] DEFAULT 'TASK',
    [milestone] NVARCHAR(1000),
    [assigneeId] NVARCHAR(1000),
    [startDate] DATETIME2,
    [endDate] DATETIME2,
    [estimatedHours] FLOAT(53) NOT NULL CONSTRAINT [tasks_estimatedHours_df] DEFAULT 0,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [tasks_status_df] DEFAULT 'NOT_STARTED',
    [sortOrder] INT NOT NULL CONSTRAINT [tasks_sortOrder_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [tasks_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [tasks_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[timesheet_entries] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [projectId] NVARCHAR(1000) NOT NULL,
    [taskId] NVARCHAR(1000),
    [date] DATE NOT NULL,
    [hours] FLOAT(53) NOT NULL,
    [description] NVARCHAR(1000),
    [billable] BIT NOT NULL CONSTRAINT [timesheet_entries_billable_df] DEFAULT 1,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [timesheet_entries_status_df] DEFAULT 'DRAFT',
    [weekStart] DATE NOT NULL,
    [overriddenBy] NVARCHAR(1000),
    [overrideNote] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [timesheet_entries_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [timesheet_entries_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[timesheet_approvals] (
    [id] NVARCHAR(1000) NOT NULL,
    [entryId] NVARCHAR(1000) NOT NULL,
    [approverId] NVARCHAR(1000) NOT NULL,
    [action] NVARCHAR(1000) NOT NULL,
    [note] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [timesheet_approvals_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [timesheet_approvals_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[incidents] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [weekStart] DATE NOT NULL,
    [description] NVARCHAR(1000),
    [chaseCount] INT NOT NULL CONSTRAINT [incidents_chaseCount_df] DEFAULT 0,
    [lastChasedAt] DATETIME2,
    [resolved] BIT NOT NULL CONSTRAINT [incidents_resolved_df] DEFAULT 0,
    [resolvedAt] DATETIME2,
    [resolvedNote] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [incidents_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [incidents_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[notifications] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [channel] NVARCHAR(1000) NOT NULL,
    [subject] NVARCHAR(1000) NOT NULL,
    [body] NVARCHAR(1000) NOT NULL,
    [read] BIT NOT NULL CONSTRAINT [notifications_read_df] DEFAULT 0,
    [sentAt] DATETIME2,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [notifications_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [notifications_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[keka_sync_logs] (
    [id] NVARCHAR(1000) NOT NULL,
    [syncedAt] DATETIME2 NOT NULL CONSTRAINT [keka_sync_logs_syncedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [recordsSync] INT NOT NULL CONSTRAINT [keka_sync_logs_recordsSync_df] DEFAULT 0,
    [status] NVARCHAR(1000) NOT NULL,
    [error] NVARCHAR(1000),
    CONSTRAINT [keka_sync_logs_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_managerId_fkey] FOREIGN KEY ([managerId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[project_members] ADD CONSTRAINT [project_members_projectId_fkey] FOREIGN KEY ([projectId]) REFERENCES [dbo].[projects]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[project_members] ADD CONSTRAINT [project_members_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tasks] ADD CONSTRAINT [tasks_projectId_fkey] FOREIGN KEY ([projectId]) REFERENCES [dbo].[projects]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tasks] ADD CONSTRAINT [tasks_assigneeId_fkey] FOREIGN KEY ([assigneeId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[timesheet_entries] ADD CONSTRAINT [timesheet_entries_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[timesheet_entries] ADD CONSTRAINT [timesheet_entries_projectId_fkey] FOREIGN KEY ([projectId]) REFERENCES [dbo].[projects]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[timesheet_entries] ADD CONSTRAINT [timesheet_entries_taskId_fkey] FOREIGN KEY ([taskId]) REFERENCES [dbo].[tasks]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[timesheet_approvals] ADD CONSTRAINT [timesheet_approvals_entryId_fkey] FOREIGN KEY ([entryId]) REFERENCES [dbo].[timesheet_entries]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[timesheet_approvals] ADD CONSTRAINT [timesheet_approvals_approverId_fkey] FOREIGN KEY ([approverId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[incidents] ADD CONSTRAINT [incidents_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[notifications] ADD CONSTRAINT [notifications_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH


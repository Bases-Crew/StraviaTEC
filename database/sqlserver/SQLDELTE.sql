-- Eliminar todos los procedimientos almacenados
DECLARE @sql NVARCHAR(MAX) = '';
SELECT @sql += 'DROP PROCEDURE IF EXISTS ' + QUOTENAME(SCHEMA_NAME(p.schema_id)) + '.' + QUOTENAME(p.name) + ';'
FROM sys.procedures AS p;

EXEC sp_executesql @sql;

-- Eliminar todas las funciones
SET @sql = '';
SELECT @sql += 'DROP FUNCTION IF EXISTS ' + QUOTENAME(SCHEMA_NAME(o.schema_id)) + '.' + QUOTENAME(o.name) + ';'
FROM sys.objects AS o
WHERE o.type_desc LIKE '%FUNCTION%';

EXEC sp_executesql @sql;

-- Eliminar todos los triggers
SET @sql = '';
SELECT @sql += 'DROP TRIGGER IF EXISTS ' + QUOTENAME(SCHEMA_NAME(t.parent_id)) + '.' + QUOTENAME(t.name) + ';'
FROM sys.triggers AS t
WHERE t.is_ms_shipped = 0;

EXEC sp_executesql @sql;

-- Eliminar todas las vistas
SELECT @sql += 'DROP VIEW ' + QUOTENAME(SCHEMA_NAME(schema_id)) + '.' + QUOTENAME(name) + '; '
FROM sys.views;

EXEC sp_executesql @sql;

-- Deshabilitar las restricciones de clave foránea
SET @sql = '';
SELECT @sql += 'ALTER TABLE ' + QUOTENAME(SCHEMA_NAME(t.schema_id)) + '.' + QUOTENAME(t.name) + ' DROP CONSTRAINT ' + QUOTENAME(f.name) + ';'
FROM sys.foreign_keys AS f
  INNER JOIN sys.tables AS t ON f.parent_object_id = t.object_id;

EXEC sp_executesql @sql;

-- Eliminar las tablas
SET @sql = '';
SELECT @sql += 'DROP TABLE IF EXISTS ' + QUOTENAME(TABLE_SCHEMA) + '.' + QUOTENAME(TABLE_NAME) + ';'
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE';

EXEC sp_executesql @sql;

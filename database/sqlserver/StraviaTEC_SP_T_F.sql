CREATE OR ALTER PROCEDURE sp_GetCountries
AS
BEGIN
	SELECT CountryName, Flag
	FROM COUNTRY
	ORDER BY CountryName
END;
GO

CREATE OR ALTER PROCEDURE sp_OrganizerLogin @Email VARCHAR(25), @Password VARCHAR(16)
AS
BEGIN
	DECLARE @Count INT;

    SELECT @Count = COUNT(*)
    FROM ORGANIZER
    WHERE Oemail = @Email AND Opassword = @Password;

    SELECT CASE WHEN @Count > 0 THEN 1 ELSE 0 END AS 'IsValid';
END;
GO

CREATE OR ALTER PROCEDURE sp_AthleteLogin @Email VARCHAR(25), @Password VARCHAR(16)
AS
BEGIN
	DECLARE @Count INT;

    SELECT @Count = COUNT(*)
    FROM ATHLETE
    WHERE Aemail = @Email AND Apassword = @Password;

    SELECT CASE WHEN @Count > 0 THEN 1 ELSE 0 END AS 'IsValid';
END;
GO

CREATE OR ALTER PROCEDURE sp_NewAthlete @Aemail VARCHAR(25), 
							   @Apassword VARCHAR(16), 
							   @Fname	VARCHAR(15), 
							   @Mname	VARCHAR(15), 
							   @Lname1	VARCHAR(15), 
							   @Lname2 VARCHAR(15), 
							   @Photo VARBINARY(MAX) = NULL, 
							   @CountryName VARCHAR(30), 
							   @Birth_date	DATE
AS
BEGIN
	INSERT INTO ATHLETE(Aemail, Apassword, Fname, Mname, Lname1, Lname2, Photo, Cno, Birth_date)
	VALUES(@Aemail, @Apassword, @Fname, @Mname, @Lname1, @Lname2, @Photo, (SELECT Cnumber FROM COUNTRY WHERE CountryName = @CountryName), @Birth_date)
END;
GO

CREATE OR ALTER PROCEDURE sp_GetAthletes
AS
BEGIN
	SELECT Aemail, Apassword, Fname, Mname, Lname1, Lname2, Photo, Cno, CONVERT(VARCHAR(10), Birth_date, 120) AS Birth_date
	FROM ATHLETE
	ORDER BY Fname, Lname1
END;
GO

CREATE OR ALTER PROCEDURE sp_GetAthleteByEmail @Email VARCHAR(25)
AS
BEGIN
	SELECT A.Aemail, A.Apassword, A.Fname, A.Mname, A.Lname1, A.Lname2, A.Photo, A.Cno, CONVERT(VARCHAR(10), A.Birth_date, 120) AS Birth_date, C.CountryName, C.Flag
	FROM ATHLETE A JOIN COUNTRY C ON Cno = Cnumber
	WHERE A.Aemail = @Email
END;
GO
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

CREATE OR ALTER PROCEDURE sp_GetSports
AS
BEGIN
	SELECT SportName
	FROM SPORT
	ORDER BY SportName
END;
GO

CREATE OR ALTER PROCEDURE sp_NewChallenge @Cname VARCHAR(50),
										  @Ctype VARCHAR(8),
										  @StartDate DATE,
										  @FinalDate DATE,
										  @Pid	INT,
										  @SportName VARCHAR(10),
									      @Mileage SMALLINT
AS
BEGIN
	INSERT INTO CHALLENGE(Cname, Ctype, StartDate, FinalDate, Pid, Sptid, Mileage)
	VALUES(@Cname, @Ctype, @StartDate, @FinalDate, @Pid, (SELECT SportID FROM SPORT WHERE SportName = @SportName), @Mileage)
END;
GO

CREATE OR ALTER PROCEDURE sp_GetChallenges
AS
BEGIN
	SELECT ChallengeID AS id , Cname AS challenge_name, Mileage AS 'description', Ctype AS challenge_type, StartDate AS 'start_date', FinalDate AS 'final_date' 
	FROM CHALLENGE
END;
GO

CREATE OR ALTER PROCEDURE sp_GetAthleteInformation @Aemail VARCHAR(25)
AS
BEGIN
    SELECT A.Aemail,
           CONCAT(A.Fname, ' ', A.Lname1) AS nombre,
		   A.Fname AS firstname,
		   ISNULL(A.Mname, '') AS secondname,
		   A.Lname1 AS apellido1,
		   A.Lname2 AS apellido2,
		   C.CountryName AS pais,
	       COUNT(DISTINCT AC.Challid) AS challenges,
		   COUNT(DISTINCT I.Inumber) AS runs,
		   CASE WHEN F.Afollows IS NOT NULL THEN 1 ELSE 0 END AS arefriends
    FROM ATHLETE A
    JOIN COUNTRY C ON A.Cno = C.Cnumber
    LEFT JOIN ATHLETE_CHALLENGE AC ON A.Aemail = AC.Auser
    LEFT JOIN INSCRIPTION I ON A.Aemail = I.Auser
    LEFT JOIN FOLLOWS F ON @Aemail = F.Afollower AND F.Afollows = A.Aemail
	WHERE A.Aemail <> @Aemail
    GROUP BY A.Aemail, A.Fname, A.Mname, A.Lname1, A.Lname2, C.CountryName, F.Afollows
	ORDER BY nombre;
END;
GO

CREATE OR ALTER PROCEDURE sp_FollowUnfollow @followerEmail VARCHAR(25), @followsEmail VARCHAR(25)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM FOLLOWS WHERE Afollower = @followerEmail AND Afollows = @followsEmail)
    BEGIN
        DELETE FROM FOLLOWS 
		WHERE Afollower = @followerEmail AND Afollows = @followsEmail;
    END
    ELSE
    BEGIN
        INSERT INTO FOLLOWS (Afollower, Afollows) 
		VALUES (@followerEmail, @followsEmail);
    END

	EXEC sp_GetAthleteInformation @followerEmail;
END;
GO


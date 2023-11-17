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

CREATE OR ALTER PROCEDURE sp_GetNotExpiredChallenges
AS
BEGIN
	SELECT C.ChallengeID AS id , C.Cname AS challenge_name, C.Mileage, C.Ctype AS challenge_type, C.StartDate AS 'start_date', C.FinalDate AS 'final_date', S.SportName
	FROM CHALLENGE C
	JOIN SPORT S ON C.Pid = S.SportID
	WHERE FinalDate > GETDATE();
END;
GO

CREATE OR ALTER PROCEDURE sp_GetUnsubscribedChallenges @Aemail VARCHAR(25)
AS
BEGIN
	SELECT C.ChallengeID AS id , C.Cname AS challenge_name, C.Mileage, C.Ctype AS challenge_type, C.StartDate AS 'start_date', C.FinalDate AS 'final_date', S.SportName
	FROM CHALLENGE C
	JOIN SPORT S ON C.Pid = S.SportID
	WHERE FinalDate > GETDATE() AND NOT EXISTS (SELECT 1 FROM ATHLETE_CHALLENGE AC WHERE AC.Auser = @Aemail AND AC.Challid = C.ChallengeID);
END;
GO

CREATE OR ALTER PROCEDURE sp_AcceptChallenge @Aemail VARCHAR(25), @challengeID INT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM ATHLETE_CHALLENGE WHERE Auser = @Aemail AND Challid = @challengeID)
    BEGIN
        RETURN 0
    END
    ELSE
    BEGIN
        INSERT INTO ATHLETE_CHALLENGE(Auser, Challid) 
		VALUES (@Aemail, @challengeID);

		RETURN 1
    END
END;
GO

CREATE OR ALTER FUNCTION dbo.CalculateCompletion (@TotalMileage INT, @ChallengeMileage INT)
RETURNS DECIMAL(5,2)
AS
BEGIN
    DECLARE @Completion DECIMAL(5,2);

    SET @Completion = 0;

    IF @ChallengeMileage > 0
    BEGIN
        SET @Completion = CAST(@TotalMileage AS DECIMAL(5,2)) / @ChallengeMileage * 100;
    END

    RETURN @Completion;
END;
GO

CREATE OR ALTER PROCEDURE sp_GetAthleteChallengeInfo @Aemail VARCHAR(25)
AS
BEGIN
    SELECT C.ChallengeID AS id,
		   C.Cname AS challenge_name,
		   C.Mileage,
		   C.Ctype AS ChallengeType,
	       C.StartDate AS 'start_date',
		   C.FinalDate AS 'final_date',
		   S.SportName AS Sport_name,
		   SP.Sname AS sponsor_name,
		   SP.Logo AS sponsor_logo,
		   SP.Phone AS sponsor_phone,
		   SP.Agent AS sponsor_agent,
		   dbo.CalculateCompletion(COALESCE(SUM(ACT.Mileage), 0), C.Mileage) AS Completion
    FROM CHALLENGE C
    JOIN ATHLETE_CHALLENGE AC ON C.ChallengeID = AC.Challid
    JOIN ATHLETE A ON AC.Auser = A.Aemail
    LEFT JOIN ACTIVITY ACT ON AC.Auser = ACT.Auser AND AC.Challid = ACT.Challid
    JOIN SPORT S ON C.Sptid = S.SportID
    LEFT JOIN CHALLENGE_SPONSOR CS ON C.ChallengeID = CS.Challid
    LEFT JOIN SPONSOR SP ON CS.Spnid = SP.SponsorID
    WHERE ACT.Auser = @Aemail AND ACT.Adate BETWEEN C.StartDate AND C.FinalDate
    GROUP BY C.ChallengeID, C.Cname, C.Mileage, C.Ctype, C.StartDate, C.FinalDate, S.SportName, SP.Sname, SP.Logo, SP.Phone, SP.Agent;
END;
GO

CREATE OR ALTER PROCEDURE sp_DeleteAthlete @Aemail VARCHAR(25)
AS
BEGIN
	BEGIN TRY
        BEGIN TRANSACTION;

        DELETE FROM FOLLOWS
        WHERE Afollower = @Aemail OR Afollows = @Aemail;

        DELETE FROM COMMENT
        WHERE Auser = @Aemail
        AND Actid IN (SELECT ActivityID FROM ACTIVITY WHERE Auser = @Aemail);

        DELETE FROM ACTIVITY
        WHERE Auser = @Aemail;

        DELETE FROM ATHLETE_CHALLENGE
        WHERE Auser = @Aemail;

        DELETE FROM ATHLETE_GROUP
        WHERE Auser = @Aemail;

        DELETE FROM ATHLETE
        WHERE Aemail = @Aemail;

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        THROW;
    END CATCH;
END;
GO

EXEC sp_DeleteAthlete 'marco@gmail.com'

select * from ATHLETE
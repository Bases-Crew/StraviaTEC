CREATE OR ALTER PROCEDURE sp_GetCountries
AS
BEGIN
	SELECT Cnumber, CountryName, Flag
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

CREATE OR ALTER PROCEDURE sp_NewChallenge
    @Nombre VARCHAR(50),
    @ctype VARCHAR(8),
    @kilometraje SMALLINT,
    @inicial DATE,
    @final DATE,
    @Privacidad INT,
    @Patrocinadores VARCHAR(MAX),
    @Grupos VARCHAR(MAX),
    @SportName VARCHAR(10)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @Challid INT;

		IF NOT EXISTS (SELECT 1 FROM PRIVACY WHERE PrivacyID = 1)
            BEGIN
                INSERT INTO PRIVACY DEFAULT VALUES;
            END

        INSERT INTO CHALLENGE (Cname, Ctype, StartDate, FinalDate, Pid, Sptid, Mileage)
        VALUES (@Nombre, @ctype, @inicial, @final, 1, (SELECT SportID FROM SPORT WHERE SportName = @SportName), @kilometraje);

        SET @Challid = SCOPE_IDENTITY();

        IF @Privacidad <> 0
        BEGIN
            INSERT INTO PRIVACY DEFAULT VALUES;

            DECLARE @PrivacyID INT = SCOPE_IDENTITY();

            INSERT INTO GROUP_PRIVACY (Gid, Pid)
            SELECT GroupID, @PrivacyID
            FROM SGROUP
            WHERE Gname IN (SELECT value FROM STRING_SPLIT(@Grupos, ','));

            UPDATE CHALLENGE
            SET Pid = @PrivacyID
            WHERE ChallengeID = @Challid;
        END

        INSERT INTO CHALLENGE_SPONSOR (Challid, Spnid)
        SELECT @Challid, SponsorID
        FROM SPONSOR
        WHERE Sname IN (SELECT value FROM STRING_SPLIT(@Patrocinadores, ','));

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        THROW;
    END CATCH;
END;
GO

CREATE OR ALTER PROCEDURE sp_GetChallenges
AS
BEGIN
	SELECT ChallengeID AS id , Cname AS challenge_name, Mileage AS 'description', Ctype AS challenge_type, CONVERT(VARCHAR(10), StartDate, 120) AS 'start_date', CONVERT(VARCHAR(10), FinalDate, 120) AS 'final_date' 
	FROM CHALLENGE
END;
GO

CREATE OR ALTER PROCEDURE sp_GetChallengesInfo
AS
BEGIN
    SELECT
        CH.ChallengeID,
        CH.Cname,
        CH.Ctype,
		CH.Mileage,
        CH.StartDate,
        CH.FinalDate,
        CH.Pid,
		COALESCE(STRING_AGG(SP.Sname, ', '), '') AS Patrocinadores,
        COALESCE(STRING_AGG(G.Gname, ', '), '') AS Grupos,
        S.SportName
    FROM
        CHALLENGE CH
    LEFT JOIN
        PRIVACY P ON CH.Pid = P.PrivacyID
    LEFT JOIN
        SPORT S ON CH.Sptid = S.SportID
    LEFT JOIN
        CHALLENGE_SPONSOR CS ON CH.ChallengeID = CS.Challid
    LEFT JOIN
        SPONSOR SP ON CS.Spnid = SP.SponsorID
	LEFT JOIN
        GROUP_PRIVACY GP ON CH.Pid = GP.Pid
    LEFT JOIN
        SGROUP G ON GP.Gid = G.GroupID
	GROUP BY
        CH.ChallengeID,
        CH.Cname,
        CH.Ctype,
        CH.StartDate,
        CH.FinalDate,
        CH.Pid,
        CH.Sptid,
        S.SportName,
        CH.Mileage;
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

CREATE OR ALTER VIEW NotExpiredChallengesView AS
SELECT C.ChallengeID AS id , C.Cname AS challenge_name, C.Mileage, C.Ctype AS challenge_type, C.StartDate AS 'start_date', C.FinalDate AS 'final_date', S.SportName
	FROM CHALLENGE C
	JOIN SPORT S ON C.Pid = S.SportID
	WHERE FinalDate > GETDATE();
GO

CREATE OR ALTER PROCEDURE sp_GetNotExpiredChallenges
AS
BEGIN
	SELECT *
	FROM NotExpiredChallengesView
END;
GO

CREATE OR ALTER VIEW UnsubscribedChallengesView AS
SELECT C.ChallengeID AS id , C.Cname AS challenge_name, C.Mileage, C.Ctype AS challenge_type, C.StartDate AS 'start_date', C.FinalDate AS 'final_date', S.SportName
	FROM CHALLENGE C
	JOIN SPORT S ON C.Pid = S.SportID
	WHERE FinalDate > GETDATE();
GO

CREATE OR ALTER PROCEDURE sp_GetUnsubscribedChallenges @Aemail VARCHAR(25)
AS
BEGIN
	SELECT *
	FROM UnsubscribedChallengesView
	WHERE NOT EXISTS (SELECT 1 FROM ATHLETE_CHALLENGE AC WHERE AC.Auser = @Aemail AND AC.Challid = id);
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

CREATE OR ALTER VIEW AthleteChallengeView AS
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
		   dbo.CalculateCompletion(COALESCE(SUM(ACT.Mileage), 0), C.Mileage) AS Completion,
		   ACT.Auser
    FROM CHALLENGE C
    JOIN ATHLETE_CHALLENGE AC ON C.ChallengeID = AC.Challid
    JOIN ATHLETE A ON AC.Auser = A.Aemail
    LEFT JOIN ACTIVITY ACT ON AC.Auser = ACT.Auser AND AC.Challid = ACT.Challid
    JOIN SPORT S ON C.Sptid = S.SportID
    LEFT JOIN CHALLENGE_SPONSOR CS ON C.ChallengeID = CS.Challid
    LEFT JOIN SPONSOR SP ON CS.Spnid = SP.SponsorID
	WHERE ACT.Adate BETWEEN C.StartDate AND C.FinalDate
    GROUP BY C.ChallengeID, C.Cname, C.Mileage, C.Ctype, C.StartDate, C.FinalDate, S.SportName, SP.Sname, SP.Logo, SP.Phone, SP.Agent, ACT.Auser;
GO

CREATE OR ALTER PROCEDURE sp_GetAthleteChallengeInfo @Aemail VARCHAR(25)
AS
BEGIN
    SELECT id,
		   challenge_name,
		   Mileage,
		   ChallengeType,
	       'start_date',
		   'final_date',
		   Sport_name,
		   sponsor_name,
		   sponsor_logo,
		   sponsor_phone,
		   sponsor_agent,
		   Completion
    FROM AthleteChallengeView
    WHERE Auser = @Aemail
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

CREATE OR ALTER PROCEDURE sp_NewRace
    @RaceName VARCHAR(50),
    @Price DECIMAL(7, 2),
    @Date DATE,
    @Route VARCHAR(MAX), 
    @Privacy INT,
    @Sponsors VARCHAR(MAX),
    @Categories VARCHAR(MAX),
    @BankAccounts VARCHAR(MAX), 
    @SportName VARCHAR(10),
    @Groups VARCHAR(MAX) 
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @RaceID INT;

		IF NOT EXISTS (SELECT 1 FROM PRIVACY WHERE PrivacyID = 1)
            BEGIN
                INSERT INTO PRIVACY DEFAULT VALUES;
            END

        INSERT INTO RACE (Rname, Price, Rdate, Rroute, Pid, Sptid)
        VALUES (@RaceName, @Price, @Date, CAST(@Route AS XML), 1, (SELECT SportID FROM SPORT WHERE SportName = @SportName));

        SET @RaceID = SCOPE_IDENTITY();

        INSERT INTO RACE_SPONSOR (Rid, Spnid)
        SELECT @RaceID, SponsorID
        FROM SPONSOR
        WHERE Sname IN (SELECT value FROM STRING_SPLIT(@Sponsors, ','));

        INSERT INTO RACE_CATEGORY (Rid, Catid)
        SELECT @RaceID, CategoryID
        FROM CATEGORY
        WHERE CategoryName IN (SELECT value FROM STRING_SPLIT(@Categories, ','));

        INSERT INTO RACE_BANKACCS (Rid, Account)
        SELECT @RaceID, CONVERT(INT, value)
        FROM STRING_SPLIT(@BankAccounts, ',');

       
            IF @Privacy <> 0
            BEGIN
                INSERT INTO PRIVACY DEFAULT VALUES;

                DECLARE @PrivacyID INT = SCOPE_IDENTITY();

                INSERT INTO GROUP_PRIVACY (Gid, Pid)
                SELECT GroupID, @PrivacyID
                FROM SGROUP
                WHERE Gname IN (SELECT value FROM STRING_SPLIT(@Groups, ','));

                UPDATE RACE
                SET Pid = @PrivacyID
                WHERE RaceID = @RaceID;
            END
    

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        THROW;
    END CATCH;
END;
GO

CREATE OR ALTER PROCEDURE sp_GetRacesInfo
AS
BEGIN
    SELECT
        R.RaceID,
        R.Rname AS 'raceName',
        R.Price,
        R.Rdate AS 'date',
        CAST(R.Rroute AS VARCHAR(MAX)) AS 'route',
        R.Pid AS Privacy,
        ISNULL(
            (SELECT STRING_AGG(Sp.Sname, ', ') 
             FROM RACE_SPONSOR RS
             JOIN SPONSOR Sp ON RS.Spnid = Sp.SponsorID
             WHERE RS.Rid = R.RaceID), '') AS Sponsors,
        ISNULL(
            (SELECT STRING_AGG(Cat.CategoryName, ', ')
             FROM RACE_CATEGORY RC
             JOIN CATEGORY Cat ON RC.Catid = Cat.CategoryID
             WHERE RC.Rid = R.RaceID), '') AS Categories,
        ISNULL(
            (SELECT STRING_AGG(CONVERT(VARCHAR, RBA.Account), ', ')
             FROM RACE_BANKACCS RBA
             WHERE RBA.Rid = R.RaceID), '') AS BankAccounts,
		S.SportName,
		ISNULL(P.GroupNames, '') AS Groups
    FROM RACE R
    JOIN SPORT S ON R.Sptid = S.SportID
    OUTER APPLY (
        SELECT STRING_AGG(G.Gname, ', ') AS GroupNames
        FROM GROUP_PRIVACY GP
        JOIN SGROUP G ON GP.Gid = G.GroupID
        WHERE GP.Pid = R.Pid
    ) P
END;
GO

CREATE OR ALTER PROCEDURE sp_GetGroups
AS
BEGIN
	SELECT Gname, Logo
	FROM SGROUP
	ORDER BY Gname
END;
GO

CREATE OR ALTER PROCEDURE sp_NewGroup
    @GroupName VARCHAR(50),
    @OrganizerEmail VARCHAR(25),
    @Logo VARCHAR(250)
AS
BEGIN
	INSERT INTO SGROUP (Gname, Ouser, Logo)
	VALUES (@GroupName, @OrganizerEmail, @Logo);
END;
GO

CREATE OR ALTER PROCEDURE sp_GetSponsors
AS
BEGIN
	SELECT Sname
	FROM SPONSOR
	ORDER BY Sname
END;
GO

CREATE OR ALTER PROCEDURE sp_GetCategories
AS
BEGIN
	SELECT CategoryName, Descr
	FROM CATEGORY
END;
GO

CREATE OR ALTER TRIGGER tgr_CheckBirthDate
ON ATHLETE
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT * FROM inserted WHERE Birth_date = CAST(GETDATE() AS DATE))
    BEGIN
        RAISERROR ('La fecha de cumpleaños no puede ser la fecha actual', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO

CREATE OR ALTER TRIGGER tgr_CheckNegativeMileage
ON ACTIVITY
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Verifica si hay alguna fila insertada o actualizada con un millaje negativo
    IF EXISTS (SELECT * FROM inserted WHERE Mileage < 0)
    BEGIN
        RAISERROR ('El millaje no puede ser un valor negativo', 16, 1);
        ROLLBACK TRANSACTION;
    END
END
GO 

CREATE OR ALTER TRIGGER tgr_CheckNegativeMileageInChallenge
ON CHALLENGE
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Verifica si hay alguna fila insertada o actualizada con un millaje negativo
    IF EXISTS (SELECT * FROM inserted WHERE Mileage < 0)
    BEGIN
        RAISERROR ('El millaje en un desafío no puede ser un valor negativo', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO

CREATE OR ALTER FUNCTION fn_GetAllCountries()
RETURNS TABLE
AS
RETURN
(
    SELECT Cnumber, CountryName, Flag
    FROM COUNTRY
);
GO

CREATE OR ALTER FUNCTION fn_GetAllAthletes()
RETURNS TABLE
AS
RETURN
(
    SELECT Aemail, Apassword, Fname, Mname, Lname1, Lname2, Photo, Cno, Birth_date
    FROM ATHLETE
);
GO

CREATE OR ALTER FUNCTION fn_GetAllSports()
RETURNS TABLE
AS
RETURN
(
    SELECT SportID, SportName
    FROM SPORT
);
GO

CREATE OR ALTER TRIGGER trg_PreventPastStartDate
ON CHALLENGE
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CurrentDate DATE = GETDATE();

    IF EXISTS (
        SELECT 1
        FROM inserted
        WHERE StartDate < @CurrentDate
    )
    BEGIN
        RAISERROR ('No se pueden insertar retos con StartDate en el pasado.', 16, 1);
    END
END;
GO

CREATE OR ALTER VIEW ActivitySportView AS
SELECT 
    A.ActivityID,
    A.Adate,
    A.Ahour,
    A.Aduration,
    A.Mileage,
    A.Aroute,
    A.Auser,
    A.Rid,
    A.Challid,
    A.Sptid,
    S.SportID,
    S.SportName
FROM ACTIVITY A
JOIN SPORT S ON A.Sptid = S.SportID;
GO



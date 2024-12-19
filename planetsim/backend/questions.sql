--CREATE TABLE mercury_questions(id INTEGER PRIMARY KEY, question TEXT NOT NULL, rightanswer TEXT NOT NULL, option1 TEXT NOT NULL, option2 TEXT NOT NULL, option3 TEXT NOT NULL);

--INSERT INTO mercury_questions(id, question, rightanswer, option1, option2, option3)
--VALUES (1, "What effect does the Sun's proximity have on Mercury's surface?", "High solar radiation", "Intense wind storms", "Frequent solar eclipses", "High humidity");
--VALUES (2, "How does Mercury's lack of a significant atmosphere affect its surface temperature?", "Extreme temperature fluctuations", "Uniform temperatures", "Constant cold365", "Mild temperatures");
--VALUES (3, "Which element is Mercury rich in, contributing to its dense metallic core?", "Iron", "Silicon", "Copper", "Aluminum");
--VALUES (4, "What visual phenomenon on Mercury is caused by its extreme orbital eccentricity?", "Sun appears to briefly reverse its direction", "Rainbows", "Double sunsets", "Permanent solar eclipse");
--VALUES (5, "What is the orbital period of Mercury around the Sun, in Earth days?", "88", "687", "365", "164");

-- DELETE FROM questions
-- WHERE question = "how many moons?"

--CREATE TABLE questions AS
-- SELECT id, questi--on, rightanswer, option1, option2, option3
-- FROM mercury_questions;

--DROP TABLE venus_questions;


--ALTER TABLE questions RENAME TO mercury_questions;
--SELECT * FROM mercury_questions;
--SELECT * FROM sqlite_master WHERE type='table';

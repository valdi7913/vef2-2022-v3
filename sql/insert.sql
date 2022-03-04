INSERT INTO users (name, username, password, admin) VALUES ('admin', 'admin','$2b$11$yR09fBMxbNpmVwSOfrgIsuCoOv8FfkqXXYygN0kOVyno/rF9MOYKS',TRUE);
INSERT INTO users (name, username, password, admin) VALUES ('valdi', 'Valdi7913', '$2b$11$doXkEqq8WcvSR5i6ZbqRv.r8zXlK.51cM1VHJpwNg7hTSXrrUgtdu', FALSE);
INSERT INTO events (id, name, slug, description, creator) VALUES (1, 'Forritarahittingur í febrúar', 'forritarahittingur-i-februar', 'Forritarar hittast í febrúar og forrita saman eitthvað frábært.', 1);
INSERT INTO events (id, name, slug, description, creator) VALUES (2, 'Hönnuðahittingur í mars', 'honnudahittingur-i-mars', 'Spennandi hittingur hönnuða í Hönnunarmars.', 1);
INSERT INTO events (id, name, slug, description, creator) VALUES (3, 'Verkefnastjórahittingur í apríl', 'verkefnastjorahittingur-i-april', 'Virkilega vel verkefnastýrður hittingur.', 1);

INSERT INTO registrations (event, userId, comment) VALUES (1,2, 'Hlakka til að forrita með ykkur');
INSERT INTO registrations (event, userId, comment) VALUES (2,2,'Jón Jónsson');
INSERT INTO registrations (event, userId, comment) VALUES (3,2,'verður vefforritað?');


BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "role" (
	"id"	integer NOT NULL,
	"label"	varchar NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "klassen" (
	"id"	integer NOT NULL,
	"naam"	varchar NOT NULL,
	"staf_id"	integer,
	CONSTRAINT "REL_6eafe27dc370454e310f3b32b0" UNIQUE("staf_id"),
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "FK_6eafe27dc370454e310f3b32b06" FOREIGN KEY("staf_id") REFERENCES "staf"("id") ON DELETE CASCADE ON UPDATE NO ACTION
);
CREATE TABLE IF NOT EXISTS "staf" (
	"id"	integer NOT NULL,
	"email"	varchar NOT NULL,
	"password"	varchar NOT NULL,
	"avatar"	varchar,
	"role_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "FK_5afa60dbe17df95f3617715c6ec" FOREIGN KEY("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
CREATE TABLE IF NOT EXISTS "student" (
	"id"	integer NOT NULL,
	"email"	varchar NOT NULL,
	"password"	varchar NOT NULL,
	"avatar"	varchar,
	"klassenId"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "FK_2fc72ca187156056c1c12eda7cb" FOREIGN KEY("klassenId") REFERENCES "klassen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
CREATE TABLE IF NOT EXISTS "commands" (
	"id"	integer NOT NULL,
	"inhoud"	varchar NOT NULL,
	"vakkenId"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "FK_736db05f2d905b85f82ed5b2e2f" FOREIGN KEY("vakkenId") REFERENCES "vakken"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
CREATE TABLE IF NOT EXISTS "klassen_has_vakken" (
	"id_klassen"	integer NOT NULL,
	"id_vakken"	integer NOT NULL,
	PRIMARY KEY("id_klassen","id_vakken"),
	CONSTRAINT "FK_b6b93d35f8d1ee1f575f86cacb7" FOREIGN KEY("id_klassen") REFERENCES "klassen"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "FK_ce9238026a669112c9ba4b8f251" FOREIGN KEY("id_vakken") REFERENCES "vakken"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "student_has_oefeningen" (
	"id_oefeningen"	integer NOT NULL,
	"id_student"	integer NOT NULL,
	PRIMARY KEY("id_oefeningen","id_student"),
	CONSTRAINT "FK_7363088d03d4c509eff078f7839" FOREIGN KEY("id_oefeningen") REFERENCES "oefeningen"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "FK_ea308b78930cd06650d7f76b39d" FOREIGN KEY("id_student") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "staf_has_vakken" (
	"id_staf"	integer NOT NULL,
	"id_vakken"	integer NOT NULL,
	PRIMARY KEY("id_staf","id_vakken"),
	CONSTRAINT "FK_5557d6ffb4e1973365e23b3d406" FOREIGN KEY("id_staf") REFERENCES "staf"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "FK_7c195db57fee7c0ce7d6f0c11c7" FOREIGN KEY("id_vakken") REFERENCES "vakken"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "student_has_commands" (
	"id_student"	integer NOT NULL,
	"id_commands"	integer NOT NULL,
	PRIMARY KEY("id_student","id_commands"),
	CONSTRAINT "FK_3219630c68e298561499b6c5c0a" FOREIGN KEY("id_student") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "FK_36291383b3b43387a3ca0c91255" FOREIGN KEY("id_commands") REFERENCES "commands"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "usermeta" (
	"id"	integer NOT NULL,
	"adres"	varchar,
	"geboortedatum"	varchar NOT NULL,
	"voornaam"	varchar NOT NULL,
	"naam"	varchar NOT NULL,
	"geboorteplaats"	varchar,
	"student_id"	integer,
	"staf_id"	integer,
	CONSTRAINT "REL_9ada614f8e7ee2027beafd2c62" UNIQUE("student_id"),
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "REL_ce4f1ccaeea2aa90f7f32952c4" UNIQUE("staf_id"),
	CONSTRAINT "FK_9ada614f8e7ee2027beafd2c627" FOREIGN KEY("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
	CONSTRAINT "FK_ce4f1ccaeea2aa90f7f32952c4b" FOREIGN KEY("staf_id") REFERENCES "staf"("id") ON DELETE CASCADE ON UPDATE NO ACTION
);
CREATE TABLE IF NOT EXISTS "vakken" (
	"id"	integer NOT NULL,
	"naam"	varchar NOT NULL,
	"abbreviation"	varchar NOT NULL,
	"description"	text NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "oefeningen" (
	"id"	integer NOT NULL,
	"naam"	varchar NOT NULL,
	"link"	varchar NOT NULL,
	"niveau"	integer NOT NULL,
	"vakId"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "FK_18a1c17615f98742b04ee57085a" FOREIGN KEY("vakId") REFERENCES "vakken"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "role" VALUES (1,'admin');
INSERT INTO "role" VALUES (2,'teacher');
INSERT INTO "klassen" VALUES (1,'1A',42);
INSERT INTO "klassen" VALUES (2,'2A',43);
INSERT INTO "klassen" VALUES (3,'3A',44);
INSERT INTO "staf" VALUES (1,'klaas.cornette@gmail.com','test','https://img.icons8.com/?size=512&id=ZdXCIaojPaas&format=png',2);
INSERT INTO "staf" VALUES (42,'jalen.wildermanstaf@bernardus.be','$2b$10$L8JH1qdWKH.whUJTwDcCmO1Y81AZu/0M3wD6ZejpFob5w88Sw6UeC','https://img.icons8.com/?size=512&id=ZdXCIaojPaas&format=png',2);
INSERT INTO "staf" VALUES (43,'kassandra.zemlakstaf@bernardus.be','$2b$10$EY5nU9sxuFIitBLIHi5yaO4t4mNgFJfpK0H2R50kSubfmLvt0m.Ty','https://img.icons8.com/?size=512&id=ZdXCIaojPaas&format=png',2);
INSERT INTO "staf" VALUES (44,'rhea.morarstaf@bernardus.be','$2b$10$hXOe4QYkQCeWNkqiLt2Lt.ad0EfSnCLhy/6dkUaM10dNlZ1m6GjYK','https://img.icons8.com/?size=512&id=ZdXCIaojPaas&format=png',2);
INSERT INTO "staf" VALUES (45,'elroy.schaeferstaf@bernardus.be','$2b$10$zfz8CH5RJvCy9eiWbAhOJexsNnCJoigRws19aaE/K6tLcNzdmrFC6','https://img.icons8.com/?size=512&id=ZdXCIaojPaas&format=png',2);
INSERT INTO "staf" VALUES (46,'joe.hermannstaf@bernardus.be','$2b$10$/7BONbFteiS6rn6UMJrzcuiPoaDTeucDzBdBPi2PRWLxX5Bc0xMoS','https://img.icons8.com/?size=512&id=ZdXCIaojPaas&format=png',2);
INSERT INTO "staf" VALUES (47,'jazmin.strosinstaf@bernardus.be','$2b$10$MuK22i57X5L6LBtWZ2KlUehUyvq6kv4l43RMTsVkHnzopAchcwOYq','https://img.icons8.com/?size=512&id=ZdXCIaojPaas&format=png',2);
INSERT INTO "staf" VALUES (48,'marlin.brakusstaf@bernardus.be','$2b$10$5C3Rbc98mVQkYAMyQTDzmOE.NXKG9dFaYFqKE6nt.7o7ccIt.7GDG','https://img.icons8.com/?size=512&id=ZdXCIaojPaas&format=png',2);
INSERT INTO "staf" VALUES (49,'hosea.bahringerstaf@bernardus.be','$2b$10$7rdifgEnl/TL7Df4e5PKCOuNKpFxyiaoqYWowZuFE2YMPejRuiYbq','https://img.icons8.com/?size=512&id=ZdXCIaojPaas&format=png',2);
INSERT INTO "staf" VALUES (50,'kaitlyn.dickinsonstaf@bernardus.be','$2b$10$Rs4nTXvDt/k4zAKYmUg2a.qY1gwNQpfloT7rRAQwptUjCC/1/rTvC','https://img.icons8.com/?size=512&id=ZdXCIaojPaas&format=png',2);
INSERT INTO "staf" VALUES (51,'josie.cummingsstaf@bernardus.be','$2b$10$KikR5tm0E6FqseRqauu2I.Z1.xe/z/lJS3ePqZVisyEdRZwomFgBi','https://img.icons8.com/?size=512&id=ZdXCIaojPaas&format=png',2);
INSERT INTO "student" VALUES (1,'klaas.cornette@gmail.com','test','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (60,'madonna.heathcote@bernardus.be','$2b$10$sTTK8QMGGCUWrj5ACW2NFeh7rzfCg7CIfJqSWuzToQe/41rmoi34.','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (61,'forrest.bechtelar@bernardus.be','$2b$10$ghBOAOO2rTul5CqMQOoxLeFu.XiQAlGT4MFc9hmlv37qqKyqq/tMW','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (62,'aniyah.wyman@bernardus.be','$2b$10$UTyELNBzZtT/rbyz0lKzAeESsCP57qc.H3rLg49AKg/BuKLdBcER2','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (63,'rita.kuhn@bernardus.be','$2b$10$0Etk8S4jgC1PGtHfeDsbfebhEwuRQPagT6TXDC80ADjRwZLiulkDu','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (64,'aiyana.spinka@bernardus.be','$2b$10$.N.eBtxEAQ1RHXf5/ure8.kTaQWIxCdtl.rMfJ7HyLUf90bPPprHO','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (65,'rafaela.green@bernardus.be','$2b$10$vQZIJPC0TJ6dfFGa2LReZ.ToSV8q/rmAU/siK7nBBeFedEywM747W','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (66,'shemar.conroy@bernardus.be','$2b$10$1vzz5C9gVzhpfrrVVtXUQe7zYMTTQ.BvlZmZw6QS.H6NhIgaCk3rG','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (67,'beulah.considine@bernardus.be','$2b$10$TtZlAq.v0RMsksllqehC4eqjH/0qObNCLq0VsWVsKfRPbZ1jeIT66','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (68,'marley.schamberger@bernardus.be','$2b$10$MryEDjbLIBkOK2ZWrrAOMuZAwx9j3gEcYI4xuwdgS8WHWDrSToWrS','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (69,'ralph.mccullough@bernardus.be','$2b$10$vi2qxlHhP2ItSkMkVAGBUO/3MEgxAAtZB5j0jY4LvZ5L1Vv4xjXna','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (70,'cody.gleason@bernardus.be','$2b$10$VeP.1YhqLpZ1CJ2RNcHAiuG1yVmMEc6MeFwaR1QVqaauxnm9yUio6','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (71,'else.nienow@bernardus.be','$2b$10$e2ej5mlD/NNv9/KOg1CC5uQmfWrBktKac8WNPe8MTB8CgYJeJW3JW','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (72,'leda.goodwin@bernardus.be','$2b$10$E4FOsQxINmzghxtkuDSwh.4jUCONfEDuSLl4fzHJJadr5NZsVIvi.','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (73,'elliott.rosenbaum@bernardus.be','$2b$10$qyFevtpAJAyBJsSztRRxqe6HXIQfHRNoIHPdmhdj3Af9N4NjfVL6S','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (74,'tremaine.lockman@bernardus.be','$2b$10$nZisx097hHJ4FCUAg/z59OVb2f1Z3o.XOW4w/MUlAh6gIaUIo.ZhG','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (75,'minnie.kihn@bernardus.be','$2b$10$rlzLqxdYzj1UpJp6wsPoXOe3l3Vz0P8ZIlw57291HUAj2JCsw0ASK','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (76,'frida.koelpin@bernardus.be','$2b$10$/NFQoFWopk4PN35aNp6kUuOKfp4YT9zLkDXutiQEvdhcG9z1oZ5Vq','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (77,'fausto.ziemann@bernardus.be','$2b$10$fFUBGAHFnvySxsyo/P7mYezelqzJWAYABZqINzzybSvKQAJiDO5bi','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (78,'stanley.streich@bernardus.be','$2b$10$tNjOY9PmPClyhTAZjGdG0OHxdiQHHxVCurWBf0iACUMFJkowvFhNy','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (79,'harrison.lowe@bernardus.be','$2b$10$CfXvJ/hW403QrJWpXdZ3zuMw.gerWO8/hIblyQ2KxWuh/bvB6pMue','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (80,'dannie.hudson@bernardus.be','$2b$10$yEmlvF4gLKYtim7tO9iog.qT5Y17WwQqAqzw43Vs9Zrs1AYYHNJPC','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (81,'barrett.harvey@bernardus.be','$2b$10$jgDKyMpAr5TbqAfAo7YUbesKb5JRlgpUpYr7RbhTrXqBq9CS82i0q','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (82,'lemuel.kirlin@bernardus.be','$2b$10$ndP7xUSsEIr./F5tjgCQJOgNylQfDmQky3Pt8hoI9OV14m.uKvlvi','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (83,'ervin.rosenbaum@bernardus.be','$2b$10$h6MLScTvmE7AHlHU/3EThe94h/PLzFkCZzLXF2sAp49RtkPYFJZiW','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (84,'laron.padberg@bernardus.be','$2b$10$aLnit8JaNezlcTuBiZ.mU.Pa7teAgUlvttiolPiqgCBd2JLLT4IO.','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (85,'braulio.labadie@bernardus.be','$2b$10$r4wGG98tGD0C8SBVWOHLZ.mKLL6vq4GCV.jpn83z1RTLxvEWcLYhK','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (86,'nicola.littel@bernardus.be','$2b$10$5zWQNpCklPgvwumUaADhjOqku49c3cByZwiFE9M5n0p3KTJIT0ciO','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (87,'verner.marquardt@bernardus.be','$2b$10$b4C4NSfcfgUH13MCDmf35eG32F33D4GQb8NZK0ns3KgjzruZPf/vO','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (88,'francisca.hickle@bernardus.be','$2b$10$lMy4FzZ.AxW9T6OKNhDXj.wZTSPbc/P5HrZIMHAK8zeGOaKt00V6S','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (89,'benjamin.feeney@bernardus.be','$2b$10$BsW/kft9SpTZr6CfpJz0oO.ohBm8ljeZ0DrM41RiZ6z4VfCHfzcRi','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (90,'shaina.reichel@bernardus.be','$2b$10$PPaXObJQM9bIA1bcVk4.GeU2ZKfTzZxL3fFtzGxbJoMVlJ3xJh.GG','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (91,'frankie.waters@bernardus.be','$2b$10$T4qGwEEAAFqwFqMMMS2R0OTAK9tM6pKZgJ/MGV.vdSmf0M8FoOffy','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (92,'clarissa.rippin@bernardus.be','$2b$10$yJnRZF2sjQBCw5WMN5rPouo9.GdytJfMlbdZ4UpdkLPP4e9G8TVcC','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (93,'spencer.rodriguez@bernardus.be','$2b$10$GRThSTjWr4Z0GyDFi8Be5.1L8H9b/sRHckIIO.i11xHunQ2OOAgQG','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (94,'reymundo.wilkinson@bernardus.be','$2b$10$InX5EF3PKeosC.agcwBkAeqzX3ZR3S/R2/yWaUilBovowkmgQXHia','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (95,'leann.schulist@bernardus.be','$2b$10$xdS7DbNzxL9PlgY0rpYZvuBWyjLLf5Ni1th92VVNf0/bMikvzXt2S','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (96,'andrew.hermann@bernardus.be','$2b$10$3bO5dz4fw2tbixKd88JP7.vq4VKjSZYKEnZuSSR2HINJjo8e6Okm6','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (97,'alize.medhurst@bernardus.be','$2b$10$MxBxgzzrZTUajiSF9WfdDOITfEDvY/3u.PSvmAhMOty.EQ18GHrwO','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (98,'lennie.hansen@bernardus.be','$2b$10$B/lc4MVLeXTEl5SHntjkaerkkBdtJEYkpv05yGmLWZmh9Mc2gY0SS','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (99,'mikayla.toy@bernardus.be','$2b$10$B8is8Idy0jUMBDXX4OIxtO64MwC5XVaqAuFYXkfKHyt6NKil/LR9K','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (100,'lexus.mante@bernardus.be','$2b$10$OBL4AM/i68rPrPL4JQvEHeZecxuTxq8SMFFCoPy6AXgwPjLLM99r2','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (101,'ardith.pollich@bernardus.be','$2b$10$YzTiVF.H.ee1cD..wRrAyOPaLDCkF.5iYut4oCM65qmCMFD3sG1QG','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (102,'emiliano.green@bernardus.be','$2b$10$8lXpxHMO8.oIjqzgYbv9WueYfqC5wB6NFdxSk8ROTMlI9JlNeOdEy','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (103,'laurel.emmerich@bernardus.be','$2b$10$WdHBvZRHDLcCFmn6/wpFbeL4HIMQw5gUk.cuY0hxtoQVKJ0PYgbae','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (104,'erin.schaden@bernardus.be','$2b$10$jPuloUQxn7n/4EqlKLcJdezFFsiWjyyVWaErAzPAR8WBPpJ48WQFe','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (105,'xzavier.stoltenberg@bernardus.be','$2b$10$lyu/4CufR6.I5tD9w02aueNFUr4AoiiIXpHcu5OfmWs1GWsBd9ePG','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (106,'hailey.howe@bernardus.be','$2b$10$cpsQTz5N.E1d1nVDNfSqd.IdLnMx5WF1vNMS78UjL3OoZz6VXBCc2','https://img.icons8.com/?size=512&id=13482&format=png',1);
INSERT INTO "student" VALUES (107,'hilton.kuphal@bernardus.be','$2b$10$VRqAhuVlmjLSFNSJ32..zuYxZgHm4Oem3asbKDlIyVTIpRrNpUJmC','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (108,'ceasar.mosciski@bernardus.be','$2b$10$z2bTK2Y.GkArhrJL0vmiWunC/uko3hAaCiFBhODO3PTgYRiVGID.G','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "student" VALUES (109,'liliana.leuschke@bernardus.be','$2b$10$ssbMKJaTdyB/QbSzB1EsZOa1inNttpXNiE7n/tf0.WJbpXQ2s4tja','https://img.icons8.com/?size=512&id=13482&format=png',2);
INSERT INTO "commands" VALUES (1,'je hebt het goed gedaan',1);
INSERT INTO "commands" VALUES (3,'je hebt het goed gedaan',1);
INSERT INTO "commands" VALUES (4,'je hebt het goed gedaan',1);
INSERT INTO "commands" VALUES (5,'je hebt het goed gedaan',1);
INSERT INTO "commands" VALUES (6,'je hebt het goed gedaan',1);
INSERT INTO "commands" VALUES (7,'je hebt het goed gedaan',1);
INSERT INTO "commands" VALUES (8,'je hebt het goed gedaan',1);
INSERT INTO "commands" VALUES (9,'je hebt het goed gedaan',1);
INSERT INTO "commands" VALUES (10,'je hebt het goed gedaan',1);
INSERT INTO "commands" VALUES (11,'je hebt het goed gedaan',1);
INSERT INTO "staf_has_vakken" VALUES (42,1);
INSERT INTO "staf_has_vakken" VALUES (42,5);
INSERT INTO "staf_has_vakken" VALUES (43,1);
INSERT INTO "staf_has_vakken" VALUES (43,5);
INSERT INTO "staf_has_vakken" VALUES (44,1);
INSERT INTO "staf_has_vakken" VALUES (44,5);
INSERT INTO "staf_has_vakken" VALUES (45,1);
INSERT INTO "staf_has_vakken" VALUES (45,5);
INSERT INTO "staf_has_vakken" VALUES (46,1);
INSERT INTO "staf_has_vakken" VALUES (46,5);
INSERT INTO "staf_has_vakken" VALUES (47,1);
INSERT INTO "staf_has_vakken" VALUES (47,5);
INSERT INTO "staf_has_vakken" VALUES (48,1);
INSERT INTO "staf_has_vakken" VALUES (48,5);
INSERT INTO "staf_has_vakken" VALUES (49,1);
INSERT INTO "staf_has_vakken" VALUES (49,5);
INSERT INTO "staf_has_vakken" VALUES (50,1);
INSERT INTO "staf_has_vakken" VALUES (50,5);
INSERT INTO "staf_has_vakken" VALUES (51,1);
INSERT INTO "staf_has_vakken" VALUES (51,5);
INSERT INTO "staf_has_vakken" VALUES (1,1);
INSERT INTO "staf_has_vakken" VALUES (1,2);
INSERT INTO "usermeta" VALUES (100,NULL,'1991-12-23 15:56:04.901','Jalen','Wilderman',NULL,NULL,42);
INSERT INTO "usermeta" VALUES (101,'6551 Lowe Rest, West Santa, Nebraska, Mozambique, 20944','2006-10-04 02:49:24.429','Madonna','Heathcote','Lesotho',60,NULL);
INSERT INTO "usermeta" VALUES (102,'0150 Hermiston Lodge, Wisozkhaven, South Dakota, Gibraltar, 40716','2006-06-29 22:55:04.119','Forrest','Bechtelar','Palestinian Territory',61,NULL);
INSERT INTO "usermeta" VALUES (103,NULL,'1970-02-05 08:55:04.227','Kassandra','Zemlak',NULL,NULL,43);
INSERT INTO "usermeta" VALUES (104,'5135 Tromp Avenue, Alvinaberg, Arizona, Russian Federation, 64330-3901','2008-04-26 03:52:46.584','Aniyah','Wyman','Liechtenstein',62,NULL);
INSERT INTO "usermeta" VALUES (105,NULL,'1980-02-25 19:02:42.359','Rhea','Morar',NULL,NULL,44);
INSERT INTO "usermeta" VALUES (106,'898 Tania Causeway, Vernerchester, Idaho, Fiji, 27122','2008-04-23 17:11:11.169','Rita','Kuhn','Belize',63,NULL);
INSERT INTO "usermeta" VALUES (107,'69737 Chadrick Falls, Fadelland, New Mexico, Uruguay, 34798','2007-05-20 07:26:15.446','Aiyana','Spinka','Virgin Islands, U.S.',64,NULL);
INSERT INTO "usermeta" VALUES (108,NULL,'1982-03-26 06:48:47.252','Elroy','Schaefer',NULL,NULL,45);
INSERT INTO "usermeta" VALUES (109,NULL,'1979-07-04 17:57:34.794','Joe','Hermann',NULL,NULL,46);
INSERT INTO "usermeta" VALUES (110,'96434 Delaney Fords, South Ansleyhaven, Nebraska, Democratic People''s Republic of Korea, 27808-2231','2007-07-01 00:27:55.375','Rafaela','Green','Libyan Arab Jamahiriya',65,NULL);
INSERT INTO "usermeta" VALUES (111,'6901 Feeney Prairie, South Tierra, Mississippi, Bahrain, 12307','2007-03-20 09:13:01.421','Shemar','Conroy','United Arab Emirates',66,NULL);
INSERT INTO "usermeta" VALUES (112,NULL,'1967-10-22 10:28:52.191','Jazmin','Strosin',NULL,NULL,47);
INSERT INTO "usermeta" VALUES (113,'01107 Schiller Via, West Antone, Delaware, Reunion, 60722-2744','2007-08-12 10:54:07.293','Beulah','Considine','Australia',67,NULL);
INSERT INTO "usermeta" VALUES (114,NULL,'1987-03-14 04:37:32.929','Marlin','Brakus',NULL,NULL,48);
INSERT INTO "usermeta" VALUES (115,'28442 Angel Views, Flatleyfort, New Jersey, Dominican Republic, 74422','2007-11-11 11:00:02.396','Marley','Schamberger','Myanmar',68,NULL);
INSERT INTO "usermeta" VALUES (116,'7965 Ardith Tunnel, Turlock, Mississippi, Sudan, 05607-9305','2007-08-15 21:40:28.350','Ralph','McCullough','Burundi',69,NULL);
INSERT INTO "usermeta" VALUES (117,NULL,'1967-03-07 13:50:12.448','Hosea','Bahringer',NULL,NULL,49);
INSERT INTO "usermeta" VALUES (118,NULL,'1971-12-18 22:04:18.739','Kaitlyn','Dickinson',NULL,NULL,50);
INSERT INTO "usermeta" VALUES (119,'0738 Karianne Springs, Kimview, Mississippi, Saint Kitts and Nevis, 58450-0255','2007-03-09 05:37:28.270','Cody','Gleason','Australia',70,NULL);
INSERT INTO "usermeta" VALUES (120,'5770 Grant Valleys, Georgiannabury, California, Falkland Islands (Malvinas), 68187','2006-01-17 17:50:41.898','Else','Nienow','Tuvalu',71,NULL);
INSERT INTO "usermeta" VALUES (121,NULL,'1996-04-09 15:50:09.312','Josie','Cummings',NULL,NULL,51);
INSERT INTO "usermeta" VALUES (122,'996 Smith Forges, Inglewood, Colorado, Liberia, 84539','2006-11-09 18:59:32.818','Leda','Goodwin','Vietnam',72,NULL);
INSERT INTO "usermeta" VALUES (123,'63768 Beulah Summit, East Cloyd, New Jersey, Paraguay, 66645-6053','2007-08-09 04:08:30.068','Elliott','Rosenbaum','Niue',73,NULL);
INSERT INTO "usermeta" VALUES (124,'09548 Reichel Rest, Virginiaberg, New Hampshire, Colombia, 84784','2008-02-09 22:29:50.867','Tremaine','Lockman','Zambia',74,NULL);
INSERT INTO "usermeta" VALUES (125,'2569 Ahmad Burgs, Langoshstad, Minnesota, Portugal, 60414-1310','2008-05-01 02:17:11.097','Minnie','Kihn','Spain',75,NULL);
INSERT INTO "usermeta" VALUES (126,'55651 Schuster Vista, Bellevue, Ohio, Malawi, 31437-6840','2008-04-29 00:49:09.664','Frida','Koelpin','Kiribati',76,NULL);
INSERT INTO "usermeta" VALUES (127,'384 Prosacco Skyway, San Angelo, Pennsylvania, Lithuania, 64564','2006-06-27 23:09:38.840','Fausto','Ziemann','China',77,NULL);
INSERT INTO "usermeta" VALUES (128,'45404 Oda Walk, Port Emmanuelle, New Hampshire, Netherlands, 40374-6804','2006-04-10 08:53:34.562','Stanley','Streich','Macedonia',78,NULL);
INSERT INTO "usermeta" VALUES (129,'9847 Polly Stream, West Margarette, Wisconsin, United States of America, 20316','2006-06-28 04:12:33.428','Harrison','Lowe','France',79,NULL);
INSERT INTO "usermeta" VALUES (130,'4623 Nicolas Cape, West Kasandra, Pennsylvania, Namibia, 89482-9494','2006-01-12 08:32:00.956','Dannie','Hudson','Spain',80,NULL);
INSERT INTO "usermeta" VALUES (131,'417 Bradtke River, Logan, New Jersey, Hong Kong, 74827-3728','2006-01-31 21:09:17.137','Barrett','Harvey','Reunion',81,NULL);
INSERT INTO "usermeta" VALUES (132,'39966 Hintz Falls, Port Tierra, New Hampshire, Mauritania, 46042-1456','2008-03-01 09:01:31.687','Lemuel','Kirlin','Sao Tome and Principe',82,NULL);
INSERT INTO "usermeta" VALUES (133,'86124 Gene Terrace, Lake Electachester, Kentucky, Saint Lucia, 90826','2008-08-09 01:13:33.591','Ervin','Rosenbaum','Puerto Rico',83,NULL);
INSERT INTO "usermeta" VALUES (134,'7269 Grimes Loaf, Jaymeburgh, Alabama, Anguilla, 49052','2007-03-18 23:23:00.238','Laron','Padberg','Estonia',84,NULL);
INSERT INTO "usermeta" VALUES (135,'26574 Brekke Causeway, Miaville, Hawaii, United Arab Emirates, 78178','2006-04-23 05:12:16.139','Braulio','Labadie','New Caledonia',85,NULL);
INSERT INTO "usermeta" VALUES (136,'67947 Hermann Forges, Emmahaven, Louisiana, Brazil, 30788','2007-01-18 04:04:48.606','Nicola','Littel','Kyrgyz Republic',86,NULL);
INSERT INTO "usermeta" VALUES (137,'8548 Hintz Canyon, West Bud, Colorado, Turkey, 11069','2007-04-25 12:24:23.897','Verner','Marquardt','Germany',87,NULL);
INSERT INTO "usermeta" VALUES (138,'29733 Rowe Corners, North Hulda, Indiana, Dominica, 34400-2676','2006-08-03 12:20:05.205','Francisca','Hickle','United Arab Emirates',88,NULL);
INSERT INTO "usermeta" VALUES (139,'4452 Shanahan Alley, Alvischester, Kansas, Svalbard & Jan Mayen Islands, 60195','2008-06-13 12:30:48.379','Benjamin','Feeney','Tonga',89,NULL);
INSERT INTO "usermeta" VALUES (140,'454 Elwyn Station, West Yadira, South Carolina, Norfolk Island, 45563-5599','2006-02-18 13:17:42.628','Shaina','Reichel','Guam',90,NULL);
INSERT INTO "usermeta" VALUES (141,'4353 Nathanael Drives, Port Donavonhaven, Alaska, Micronesia, 71659','2006-11-30 06:15:16.758','Frankie','Waters','Sao Tome and Principe',91,NULL);
INSERT INTO "usermeta" VALUES (142,'517 Aiyana Meadows, Jakubowskiview, Hawaii, Lesotho, 91018-1869','2008-09-29 15:03:53.559','Clarissa','Rippin','Central African Republic',92,NULL);
INSERT INTO "usermeta" VALUES (143,'15168 Erik Wall, Schuylerton, Nevada, Guyana, 19850-0327','2006-12-14 16:12:11.855','Spencer','Rodriguez','Saudi Arabia',93,NULL);
INSERT INTO "usermeta" VALUES (144,'78371 Agustina Fork, New Michaela, Vermont, Seychelles, 28296','2008-04-15 00:03:40.547','Reymundo','Wilkinson','Burundi',94,NULL);
INSERT INTO "usermeta" VALUES (145,'7711 Hettinger Plain, Kuhnshire, Washington, Albania, 31990-8232','2006-01-07 16:21:28.314','Leann','Schulist','Armenia',95,NULL);
INSERT INTO "usermeta" VALUES (146,'5832 Reichel Trail, Corwinville, Alaska, Italy, 91418','2007-08-24 15:11:14.313','Andrew','Hermann','Moldova',96,NULL);
INSERT INTO "usermeta" VALUES (147,'929 Ezekiel Track, Kerlukemouth, Arizona, Morocco, 47104','2008-08-05 11:20:36.236','Alize','Medhurst','Latvia',97,NULL);
INSERT INTO "usermeta" VALUES (148,'791 Hirthe Coves, Keelingbury, Oklahoma, Trinidad and Tobago, 58892','2006-09-07 14:30:27.184','Lennie','Hansen','Turkey',98,NULL);
INSERT INTO "usermeta" VALUES (149,'636 Kiehn Port, Elisabethton, West Virginia, Guinea, 06153','2007-09-01 17:47:10.520','Mikayla','Toy','Reunion',99,NULL);
INSERT INTO "usermeta" VALUES (150,'039 O''Reilly Knoll, Binsburgh, Rhode Island, Gabon, 84535-0300','2008-11-28 01:24:42.429','Lexus','Mante','Papua New Guinea',100,NULL);
INSERT INTO "usermeta" VALUES (151,'5819 Devante Vista, Ankundingport, Georgia, Sudan, 66219-8595','2007-02-18 13:43:16.979','Ardith','Pollich','Syrian Arab Republic',101,NULL);
INSERT INTO "usermeta" VALUES (152,'213 Lon Mews, North Emelyview, Rhode Island, Haiti, 72310','2007-07-22 08:32:43.518','Emiliano','Green','Martinique',102,NULL);
INSERT INTO "usermeta" VALUES (153,'2329 Shanahan Parkway, Rennerstad, Oregon, Bolivia, 87019','2008-12-23 20:02:04.347','Laurel','Emmerich','Croatia',103,NULL);
INSERT INTO "usermeta" VALUES (154,'28861 Bruen Falls, Tristinberg, Arizona, Yemen, 92584','2006-03-28 14:06:00.665','Erin','Schaden','Tunisia',104,NULL);
INSERT INTO "usermeta" VALUES (155,'602 Keira Street, Teaganview, Nebraska, Lesotho, 81764','2007-11-12 22:02:35.162','Xzavier','Stoltenberg','Uruguay',105,NULL);
INSERT INTO "usermeta" VALUES (156,'64578 Lang Burg, Keelingport, North Dakota, Solomon Islands, 02822-7973','2007-03-22 06:20:40.850','Hailey','Howe','Norway',106,NULL);
INSERT INTO "usermeta" VALUES (157,'85995 Lang Overpass, West Erniebury, Washington, Antarctica (the territory South of 60 deg S), 67922','2007-02-01 10:31:10.521','Hilton','Kuphal','Belgium',107,NULL);
INSERT INTO "usermeta" VALUES (158,'430 Fritsch Prairie, Cranston, Washington, Benin, 99504-2918','2007-11-16 23:56:40.025','Ceasar','Mosciski','Sao Tome and Principe',108,NULL);
INSERT INTO "usermeta" VALUES (159,'06951 Runolfsson Valleys, Mosciskibury, Hawaii, Niger, 18254-7771','2006-10-23 20:08:21.009','Liliana','Leuschke','Kiribati',109,NULL);
INSERT INTO "usermeta" VALUES (172,'adres','19/09/2001','klaas','cornette','gent',1,NULL);
INSERT INTO "usermeta" VALUES (173,'adres','19/09/2001','klaas','cornette','gent',NULL,1);
INSERT INTO "vakken" VALUES (1,'Nederlands','NDL','Het vak Nederlands richt zich op de studie van de Nederlandse taal, inclusief grammatica, spelling, vocabulaire en schrijfvaardigheid, evenals literatuur en communicatieve vaardigheden in het Nederlands. Het omvat het begrijpen, analyseren en produceren van geschreven en gesproken teksten in het Nederlands.');
INSERT INTO "vakken" VALUES (2,'Wiskunde','WISK','Het vak wiskunde richt zich op het bestuderen en toepassen van abstracte concepten en structuren, zoals getallen, algebra, meetkunde en statistiek, om problemen op te lossen en patronen te analyseren. Het omvat het ontwikkelen van analytisch denken, probleemoplossende vaardigheden en het begrijpen van kwantitatieve relaties in verschillende contexten.');
INSERT INTO "vakken" VALUES (3,'Lichamelijke Opvoeding','LO','Het vak lichamelijke opvoeding richt zich op het bevorderen van lichamelijke activiteit, fitheid en het ontwikkelen van motorische vaardigheden bij leerlingen. Het omvat activiteiten zoals sport, spel, gymnastiek en gezondheidseducatie, met als doel het bevorderen van een gezonde levensstijl en het ontwikkelen van sociale en fysieke vaardigheden.');
INSERT INTO "vakken" VALUES (4,'Plastische Opvoeding
','PO','Het vak plastische opvoeding, ook bekend als beeldende vorming, richt zich op het stimuleren van creativiteit en expressie door middel van visuele kunstvormen zoals tekenen, schilderen, beeldhouwen en handvaardigheid. Het omvat het ontdekken en ontwikkelen van artistieke vaardigheden, het verkennen van verschillende materialen en technieken, en het bevorderen van artistieke expressie en waardering voor kunst.');
INSERT INTO "vakken" VALUES (5,'Godsdienst','GOD','Het vak godsdienst richt zich op het bestuderen van religieuze tradities, geloofspraktijken en morele waarden in verschillende culturen en religies. Het omvat het verkennen van concepten zoals spiritualiteit, ethiek, geloofsovertuigingen en de rol van religie in de samenleving.');
INSERT INTO "vakken" VALUES (6,'Frans','FRA','Het vak Frans richt zich op het leren van de Franse taal, inclusief grammatica, woordenschat, luister- en spreekvaardigheid, leesvaardigheid en schrijfvaardigheid. Het omvat ook de studie van de Franse cultuur, tradities en gewoonten om een breder begrip van de Franstalige wereld te bevorderen.');
INSERT INTO "vakken" VALUES (7,'Techniek','TECH','Het vak techniek richt zich op het begrijpen en toepassen van technologische principes en processen om problemen op te lossen en producten te ontwerpen. Het omvat onderwerpen zoals mechanica, elektronica, informatica en technisch tekenen, waarbij leerlingen vaardigheden ontwikkelen op het gebied van ontwerp, constructie en probleemoplossing.');
INSERT INTO "vakken" VALUES (8,'Koken','KO','Het vak koken richt zich op het aanleren van culinaire vaardigheden, receptenkennis en voedingsprincipes om leerlingen in staat te stellen gezonde en smakelijke maaltijden te bereiden. Het omvat het leren van kooktechnieken, voedingsleer, het ontwikkelen van smaak en creativiteit in de keuken, en het begrijpen van voedselveiligheid en hygiëne.');
INSERT INTO "vakken" VALUES (9,'Verkoop','VER','Het vak verkoop richt zich op het ontwikkelen van vaardigheden en kennis met betrekking tot het proces van het verkopen van producten of diensten aan klanten. Het omvat onderwerpen zoals klantenservice, verkoopstrategieën, communicatievaardigheden en het begrijpen van consumentengedrag om succesvolle verkooptransacties te realiseren.');
INSERT INTO "oefeningen" VALUES (1,'module 1','https://nt2taalmenu.nl/nt2-a1-jekanmewat-menumodule1/','A1',1);
INSERT INTO "oefeningen" VALUES (3,'woorden leren','https://nt2taalmenu.nl/nt2-a1-woordinbeeld-menu/','A0-A1',1);
INSERT INTO "oefeningen" VALUES (4,'basis rekenen','https://www.crazygames.nl/spel/nullify','A2',2);
INSERT INTO "oefeningen" VALUES (5,'oef1','link oef 1',3,3);
INSERT INTO "oefeningen" VALUES (6,'oef1','link oef 1',3,4);
INSERT INTO "oefeningen" VALUES (7,'oef1','link oef 1',3,5);
INSERT INTO "oefeningen" VALUES (8,'oef1','link oef 1',3,6);
INSERT INTO "oefeningen" VALUES (9,'oef1','link oef 1',3,7);
INSERT INTO "oefeningen" VALUES (10,'oef1','link oef 1',3,8);
INSERT INTO "oefeningen" VALUES (11,'oef1','link oef 1',3,2);
CREATE INDEX IF NOT EXISTS "IDX_b6b93d35f8d1ee1f575f86cacb" ON "klassen_has_vakken" (
	"id_klassen"
);
CREATE INDEX IF NOT EXISTS "IDX_ce9238026a669112c9ba4b8f25" ON "klassen_has_vakken" (
	"id_vakken"
);
CREATE INDEX IF NOT EXISTS "IDX_7363088d03d4c509eff078f783" ON "student_has_oefeningen" (
	"id_oefeningen"
);
CREATE INDEX IF NOT EXISTS "IDX_ea308b78930cd06650d7f76b39" ON "student_has_oefeningen" (
	"id_student"
);
CREATE INDEX IF NOT EXISTS "IDX_5557d6ffb4e1973365e23b3d40" ON "staf_has_vakken" (
	"id_staf"
);
CREATE INDEX IF NOT EXISTS "IDX_7c195db57fee7c0ce7d6f0c11c" ON "staf_has_vakken" (
	"id_vakken"
);
CREATE INDEX IF NOT EXISTS "IDX_3219630c68e298561499b6c5c0" ON "student_has_commands" (
	"id_student"
);
CREATE INDEX IF NOT EXISTS "IDX_36291383b3b43387a3ca0c9125" ON "student_has_commands" (
	"id_commands"
);
COMMIT;

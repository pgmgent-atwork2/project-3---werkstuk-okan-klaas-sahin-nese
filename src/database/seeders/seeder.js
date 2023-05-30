import {faker} from "@faker-js/faker";
import bcrypt from "bcrypt";
import DataSource from "../../lib/DataSource.js";

import * as dotenv from 'dotenv';
dotenv.config();

export const makestudents = async (req, res, next) => {
    const studentRepo = await DataSource.getRepository("student");
    const startDate = new Date('2006-01-01');
    const endDate = new Date('2008-12-31');
    const aantalStudentenToGenerate = 50;
    for(let i =0; i < aantalStudentenToGenerate; i++){
        const firstname = faker.name.firstName();
        const lastname = faker.name.lastName();
        const adres = [
            faker.address.streetAddress(),
            faker.address.city(),
            faker.address.state(),
            faker.address.country(),
            faker.address.zipCode(),
          ].join(', ');
        const birthPlace = faker.address.country();
        const geboorteDatum = faker.date.between(startDate, endDate);
        const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@bernardus.be`
        const userExists = await studentRepo.findOne({
            where: {
              email: email,
            },
        });
        if (userExists) {
            req.formErrors = [{ message: "Gebruiker bestaat al." }];
            return next();
        }
        const klassenId = Math.floor(Math.random() * 2)+1;
        const hashedPassword = bcrypt.hashSync(faker.internet.password(), 10);
        const student = await studentRepo.create({
            email: email,
            password: hashedPassword,
            avatar: faker.internet.avatar(),
            meta: {
                voornaam: firstname,
                achternaam: lastname,
                adres: adres,
                geboortedatum: geboorteDatum,
                geboorteplaats: birthPlace,
            },
            klassen: {
                id: klassenId,
            },
        })
        await studentRepo.save(student)
}
return;
}  
export const maketeacher = async (req, res, next) => {
    const stafRepo = await DataSource.getRepository("staf");
    const roleReop = await DataSource.getRepository("role");
    const startDate = new Date('1965-01-01');
    const endDate = new Date('2001-12-31');
    const randomInt1 = Math.floor(Math.random() * 9)+1;
    const randomInt2 = Math.floor(Math.random() * 9)+1;
    const aantalTeachersToGenerate = 10;
     for(let j =0; j < aantalTeachersToGenerate; j++){
        const firstname = faker.name.firstName();
        const lastname = faker.name.lastName();
        const geboorteDatum = faker.date.between(startDate, endDate);
        const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}staf@bernardus.be`
        const userExists = await stafRepo.findOne({
            where: {
                email: email,
            },
        })        
        if (userExists) {
            req.formErrors = [{ message: "Gebruiker bestaat al." }];
            return next();
        }        
        const hashedPassword = bcrypt.hashSync(faker.internet.password(), 10);
        let roleId = await roleReop.findOne({
            where: {
              label: "teacher",
            },
          });
        let teacher = await stafRepo.create({
            email: email,
            password: hashedPassword,
            avatar: faker.internet.avatar(),
            meta: {
                voornaam: firstname,
                achternaam: lastname,
                geboortedatum: geboorteDatum,
            },
            vakken: [{
                id: randomInt1,
            },
            {
                id: randomInt2,
            }],
            role: {
                id: roleId.id,
            }
        })
        await stafRepo.save(teacher)
     }
     return;
}        

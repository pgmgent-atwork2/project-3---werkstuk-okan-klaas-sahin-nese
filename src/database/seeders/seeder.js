import faker from "faker";
import bcrypt from "bcrypt";
import DataSource from "../../lib/DataSource.js";

import * as dotenv from 'dotenv';
dotenv.config();
//seeder activeren met thunderclient post http://localhost:3000/api/seed

export const makestudents = async (req, res, next) => {
    const studentRepo = await DataSource.getRepository("student");
    const startDate = new Date('2006-01-01');
    const endDate = new Date('2008-12-31');
    for(let i =0; i < 1; i++){
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
        const hashedPassword = bcrypt.hashSync(faker.internet.password(), 10);
        await studentRepo.save({
            email: email,
            password: hashedPassword,
            avatar: faker.internet.avatar(),
            meta: {
                voornaam: firstname,
                achternaam: lastname,
                adres: adres,
                geboortedatum: geboorteDatum,
                geboorteplaats: birthPlace,
            }
        })
}
res.status(201).json({
    status: 'Inserted with succses.'
})
}     

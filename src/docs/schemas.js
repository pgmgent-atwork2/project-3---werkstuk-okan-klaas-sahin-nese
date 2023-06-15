export default {
    Student: {
        properties: {
            id_student: { type: 'number' },
            email: { type: 'string' },
            password: { type: 'string' },
            avatar: {type: 'string'},
            meta: {
            $ref: '#/components/schemas/Usermeta',
            },
            klassen: {
            $ref: '#/components/schemas/Klassen',
            },
            oefeningen: {
            $ref: '#/components/schemas/Oefeningen',
            },
            commands: {
            $ref: '#/components/schemas/Commands',
            },
        },
    },
    Usermeta: {
        properties: {
            id_meta: {type: 'number'},
            adres: {type: 'string'},
            geboortedatum: {type: 'string'},
            voornaam: {type: 'string'},
            achternaam: {type: 'string'},
            geboorteplaats: {type: 'string'},
            student: {
                $ref: '#/components/schemas/Student',
            },
            staf: {
                $ref: '#/components/schemas/Staf',
            }
        }
    },
    Commands: {
        properties: {
            id_commands: {type: 'number'},
            inhoud: {type: 'string'},
            vakken: {
                $ref: '#/components/schemas/Vakken',
            },
            student: {
                $ref: '#/components/schemas/Student',
            },
        },
        
    },
    Klassen: {
        properties: {
            id_klassen: { type: 'number'},
            naam: {type: 'string'},
            student: {
                $ref: '#/components/schemas/Student',
            },
            vakken: {
                $ref: '#/components/schemas/Vakken',
            },
            Staf: {
                $ref: '#/components/schemas/Staf',
            },
        }
    },
    Oefeningen: {
        properties: {
            id_oefeningen: {type: 'number'},
            naam: {type: 'string'},
            link: {type: 'string'},
            niveau: {type: 'string'},
            vakken: {
                $ref: '#/components/schemas/Vakken',
            },
            student: {
                $ref: '#/components/schemas/Student',
            }
        }
    },
    Role: {
        properties: {
            id: {type: 'number'},
            label: {type: "string"},
            staf: {
                $ref: '#/components/schemas/Staf',
            }
        }
    },
    Staf: {
        properties: {
            id_staf: {type: 'number'},
            email: {type: 'string'},
            password: {type: 'string'},
            avatar: {type: 'string'},
            role: {
                $ref: '#/components/schemas/Role',
            },
            meta: {
                $ref: '#/components/schemas/Usermeta',
            },
            klassen: {
                $ref: '#/components/schemas/Klassen',
            },
            vakken: {
                $ref: '#/components/schemas/Vakken',
            },
        }
    },
        Vakken: {
        properties: {
            id_vakken: {type: 'number'},
            naam: {type: 'string'},
            description: {type: 'string'},
            abbreviation: {type: 'string'},
            commands: {
                $ref: '#/components/schemas/Commands',
            },
            oefeningen: {
                $ref: '#/components/schemas/Oefeningen',
            },
            klassen: {
                $ref: '#/components/schemas/Klassen',
            },
            staf: {
                $ref: '#/components/schemas/Staf',
            }
        }
        },

  };
  
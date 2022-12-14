
import { Prisma } from '@prisma/client';


//let family: Prisma.FamilyCreateInput
export const family: Prisma.FamilyCreateInput = {
    name: "Cactaceae",
    subFamilies: {
        create: [
            {
                name: "Pereskioideae",
                //tribes: [],
            },
            {
                name: "Opuntioideae",
                //tribes: [],
            },
            {
                name: "Cactoideae",
                tribes: {
                    create: [
                        {
                            name: "Hylocereeae",
                            genres: {
                                create: [
                                    {
                                        name: "Epiphyllum",
                                        //species: [],
                                    },
                                    {
                                        name: "Hylocereus",
                                        //species: [],
                                    },
                                    {
                                        name: "Pseudorhipsalis",
                                        //species: [],
                                    },
                                    {
                                        name: "Strophocactus",
                                        //species: [],
                                    }
                                ]
                            },
                        },
                        {
                            name: "Cereeae",
                            genres: {
                                create: [
                                    {
                                        name: "Cereus",
                                        //species: [],
                                    },
                                    {
                                        name: "Melocactus",
                                        //species: [],
                                    },
                                    {
                                        name: "Monvillea",
                                        //species: [],
                                    },
                                    {
                                        name: "Pilosocereus",
                                        //species: [],
                                    }
                                ]
                            },
                        },
                        {
                            name: "Trichocereeae",
                            genres: {
                                create: [
                                    {
                                        name: "Borzicactus",
                                        //species: [],
                                    },
                                    {
                                        name: "Cleistocactus",
                                        //species: [],
                                    },
                                    {
                                        name: "Echinopsis",
                                        //species: [],
                                    },
                                    {
                                        name: "Espostoa",
                                        //species: [],
                                    },
                                    {
                                        name: "Haageocereus",
                                        //species: [],
                                    },
                                    {
                                        name: "Lasiocereus",
                                        //species: [],
                                    },
                                    {
                                        name: "Lobivia",
                                        //species: [],
                                    },
                                    {
                                        name: "Loxanthocereus",
                                        //species: [],
                                    },
                                    {
                                        name: "Matucana",
                                        //species: [],
                                    },
                                    {
                                        name: "Mila",
                                        //species: [],
                                    },
                                    {
                                        name: "Oreocereus",
                                        //species: [],
                                    },
                                    {
                                        name: "Oroya",
                                        //species: [],
                                    },
                                    {
                                        name: "Pygmaeocereus",
                                        //species: [],
                                    },
                                    {
                                        name: "Rauhocereus",
                                        //species: [],
                                    },
                                    {
                                        name: "Samaipaticereus",
                                        //species: [],
                                    },
                                    {
                                        name: "Trichocereus",
                                        //species: [],
                                    },
                                    {
                                        name: "Weberbauerocereus",
                                        species: {
                                            create: [
                                                {
                                                    name: "Weberbauerocereus cuzcoensis",
                                                    names: ["Name 1", "Name 2"],
                                                    morphology: "Cactus columnar muy robusto, arborescente, de hasta 4 m de alto; ramificado cerca de la base, desarrolla un tronco que llega a medir hasta 50 cm de di??metro; ramas maduras verde oscuras a grises, curvas en la base y m??s o menos rectas conforme ascienden, de 8-14 cm de di??metro, le??osas y carentes de espinas en la base; con 12-14 costillas; areolas ovaladas, grises a marrones; pocas espinas en comparaci??n con otras especies de Weberbauerocereus, de 6-15 espinas perif??ricas de hasta 1 cm de largo, una espina central de hasta 2.5 cm de largo. Flores en forma de embudo, tubo floral de 5 a 8 cm de largo, t??palos internos blanco amarillentos, t??palos externos verdosos a marr??n purp??reo; tubo floral cubierto de pelos lanosos marrones; numerosos estambres en dos series; c??mara nectar??fera elongada de hasta 1.2 cm de largo, estilo y estigma exertos. Fruto oblongo, verde oscuro, de 3 a 4 cm de di??metro, cubierto de escamas y de densos pelos blancuzcos a marrones; pulpa blanca jugosa con abundantes semillas negras ligeramente m??s alargadas que en el resto de las especies.",
                                                    habitad: "Ocupa ??reas ribere??as secas, laderas rocosas y matorrales en los departamentos de Apur??mac (Andahuaylas) y Ayacucho, entre los 1500 y 2100 m.",
                                                    iucnCode: "CACTUS001",
                                                    iucnUrl: "https://colombia.inaturalist.org/",
                                                    citiesCode: "CITIES001",
                                                    citiesUrl: "https://colombia.inaturalist.org/",
                                                    distributions: {
                                                        create: [
                                                            {
                                                                department: "Lima",
                                                                province: "Lima",
                                                                location: "Algo1",
                                                                elevation: 1.2,
                                                                longitude: -76.536488,
                                                                latitude: -10.104302,
                                                                colector: "Colector 1",
                                                                colectionNumber: "00001",
                                                                colectedAt: new Date("2019-01-19 14:00:12"),
                                                                herbarium: "Herbario 1",
                                                                photoUrls: [],
                                                            },
                                                            {
                                                                department: "Lima",
                                                                province: "Lima",
                                                                location: "Algo1",
                                                                elevation: 1.2,
                                                                longitude: -75.536488,
                                                                latitude: -11.104302,
                                                                colector: "Colector 1",
                                                                colectionNumber: "00001",
                                                                colectedAt: new Date("2019-01-19 14:00:12"),
                                                                herbarium: "Herbario 1",
                                                                photoUrls: [],
                                                            },
                                                            {
                                                                department: "Lima",
                                                                province: "Lima",
                                                                location: "Algo1",
                                                                elevation: 1.2,
                                                                longitude: -74.536488,
                                                                latitude: -9.704302,
                                                                colector: "Colector 1",
                                                                colectionNumber: "00001",
                                                                colectedAt: new Date("2019-01-19 14:00:12"),
                                                                herbarium: "Herbario 1",
                                                                photoUrls: [],
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    name: "Weberbauerocereus longicomus",
                                                    names: ["Name 1", "Name 2"],
                                                    morphology: "Cactus columnar y arborescente, de 3 a 6 m de alto, muy ramificado pero cerca a la base, ramas delgadas, de 4 a 8 cm de di??metro, con 15 a 20 costillas; areolas ovaladas, marr??n claro a gris??ceas; espinas j??venes blancuzcas o amarillo p??lido, espinas Viejas grises; 15 a 25 espinas perif??ricas muy finas, de 0.3 a 1.5 cm de largo, y 1 o 2 espinas centrales de 1 a 8 cm de largo, muchas veces curvadas. Las areolas en la zona de las flores presentan pelos lanosos y setosos de hasta 1 cm de largo. Muchos botones florales densamente cubiertos de pubescencia lanosa no llegan a madurar pero permanecen adheridos al tallo. Las flores son las m??s grandes del g??nero, hasta 12 cm de longitud y 5.5 a 7.5 cm de ancho, tubo floral en forma de embudo, t??palos internos blanco a rosados y t??palos externos rojizos a marrones; tubo floral cubierto de escamas y pelos finos blancos; c??mara nectar??fera semi-abierta con protuberancias en las paredes; numerosos estambres en dos ciclos, estigma no emergente pero localizado por encima de las anteras. Frutos globosos rojos o marr??n verdosos, hasta 3 cm de di??metro, cubiertos por densos pelos blancos; pulpa blanca y jugosa con semillas negras y lustrosas. El fruto se desprende de la planta cuando maduro. Las flores abren durante las primeras horas de la ma??ana y permanecen abiertas durante la noche.",
                                                    habitad: "Habita laderas rocosas h??medas, en los departamentos de Ancash (Huaraz) y Cajamarca (San Marcos), entre los 2000 y 3000 m.",
                                                    iucnCode: "CACTUS002",
                                                    iucnUrl: "https://colombia.inaturalist.org/",
                                                    citiesCode: "CITIES002",
                                                    citiesUrl: "https://colombia.inaturalist.org/",
                                                },
                                                {
                                                    name: "Weberbauerocereus rauhii",
                                                    names: ["Name 1", "Name 2"],
                                                    morphology: "Planta robusta de aspecto arb??reo, de hasta 4 m de alto, con un tronco corto y muchas ramas verticales que asemejan un candelabro; ramas de 8-15 cm de di??metro, 23 costillas, con areolas gris??ceas cubiertas de fina pubescencia; numerosas espinas blancas en plantas j??venes y gris blancuzcas en plantas adultas debajo de la zona de floraci??n, hasta 1 cm de largo, con 6 a 7 espinas centrales m??s gruesas y elongadas, de hasta 4 cm de longitud y una central de hasta 7 cm; espinas amarillentas a marr??n oscuro. Zona de floraci??n con solo unas pocas espinas centrales y m??s espinas elongadas y delgadas; las flores a menudo hacia un solo lado. Flores de aproximadamente 10 cm de longitud y 2 cm de di??metro, tubo floral marr??n rojizo, t??palos internos amarillentos con las puntas marrones a rojizas, t??palos externos marr??n verdosos; tubo floral densamente cubierto de escamas y pelos marrones; filamentos amarillentos; estigma verdoso sobrepasando la altura de las anteras. Frutos esf??ricos, de hasta 3 cm de di??metro, marr??n rojizos a anaranjados cuando maduros, cubiertos de escamas y pelos lanosos blanquecinos.",
                                                    habitad: "Se encuentra en laderas y planicies rocosas, y matorrales bajos, en los Departamentos de Ica (Nazca, Pisco), Arequipa y Huancavelica, entre los 500 y 2500 m.",
                                                    iucnCode: "CACTUS003",
                                                    iucnUrl: "https://colombia.inaturalist.org/",
                                                    citiesCode: "CITIES004",
                                                    citiesUrl: "https://colombia.inaturalist.org/",
                                                }
                                            ]
                                        },
                                    },
                                ]
                            },
                        },
                        {
                            name: "Notocacteae",
                            genres: {
                                create: [
                                    {
                                        name: "Corryocactus",
                                        //species: [],
                                    },
                                    {
                                        name: "Eulychnia",
                                        //species: [],
                                    },
                                    {
                                        name: "Eriosyce",
                                        //species: [],
                                    },
                                    {
                                        name: "Neowerdermannia",
                                        //species: [],
                                    }
                                ]
                            },
                        },
                        {
                            name: "Rhipsalideae",
                            genres: {
                                create: [
                                    {
                                        name: "Pfeiffera",
                                        //species: [],
                                    },
                                    {
                                        name: "Rhipsalis",
                                        //species: [],
                                    },
                                ]
                            },
                        },
                        {
                            name: "Browningieae",
                            genres: {
                                create: [
                                    {
                                        name: "Armatocereus",
                                        //species: [],
                                    },
                                    {
                                        name: "Browningia",
                                        //species: [],
                                    },
                                    {
                                        name: "Calymmanthium",
                                        //species: [],
                                    },
                                    {
                                        name: "Neoraimondia",
                                        //species: [],
                                    }
                                ]
                            },
                        },
                    ]
                }
            }
        ]
    }
}
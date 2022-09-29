
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
                                                    morphology: "Cactus columnar muy robusto, arborescente, de hasta 4 m de alto; ramificado cerca de la base, desarrolla un tronco que llega a medir hasta 50 cm de diámetro; ramas maduras verde oscuras a grises, curvas en la base y más o menos rectas conforme ascienden, de 8-14 cm de diámetro, leñosas y carentes de espinas en la base; con 12-14 costillas; areolas ovaladas, grises a marrones; pocas espinas en comparación con otras especies de Weberbauerocereus, de 6-15 espinas periféricas de hasta 1 cm de largo, una espina central de hasta 2.5 cm de largo. Flores en forma de embudo, tubo floral de 5 a 8 cm de largo, tépalos internos blanco amarillentos, tépalos externos verdosos a marrón purpúreo; tubo floral cubierto de pelos lanosos marrones; numerosos estambres en dos series; cámara nectarífera elongada de hasta 1.2 cm de largo, estilo y estigma exertos. Fruto oblongo, verde oscuro, de 3 a 4 cm de diámetro, cubierto de escamas y de densos pelos blancuzcos a marrones; pulpa blanca jugosa con abundantes semillas negras ligeramente más alargadas que en el resto de las especies.",
                                                    habitad: "Ocupa áreas ribereñas secas, laderas rocosas y matorrales en los departamentos de Apurímac (Andahuaylas) y Ayacucho, entre los 1500 y 2100 m.",
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
                                                    morphology: "Cactus columnar y arborescente, de 3 a 6 m de alto, muy ramificado pero cerca a la base, ramas delgadas, de 4 a 8 cm de diámetro, con 15 a 20 costillas; areolas ovaladas, marrón claro a grisáceas; espinas jóvenes blancuzcas o amarillo pálido, espinas Viejas grises; 15 a 25 espinas periféricas muy finas, de 0.3 a 1.5 cm de largo, y 1 o 2 espinas centrales de 1 a 8 cm de largo, muchas veces curvadas. Las areolas en la zona de las flores presentan pelos lanosos y setosos de hasta 1 cm de largo. Muchos botones florales densamente cubiertos de pubescencia lanosa no llegan a madurar pero permanecen adheridos al tallo. Las flores son las más grandes del género, hasta 12 cm de longitud y 5.5 a 7.5 cm de ancho, tubo floral en forma de embudo, tépalos internos blanco a rosados y tépalos externos rojizos a marrones; tubo floral cubierto de escamas y pelos finos blancos; cámara nectarífera semi-abierta con protuberancias en las paredes; numerosos estambres en dos ciclos, estigma no emergente pero localizado por encima de las anteras. Frutos globosos rojos o marrón verdosos, hasta 3 cm de diámetro, cubiertos por densos pelos blancos; pulpa blanca y jugosa con semillas negras y lustrosas. El fruto se desprende de la planta cuando maduro. Las flores abren durante las primeras horas de la mañana y permanecen abiertas durante la noche.",
                                                    habitad: "Habita laderas rocosas húmedas, en los departamentos de Ancash (Huaraz) y Cajamarca (San Marcos), entre los 2000 y 3000 m.",
                                                    iucnCode: "CACTUS002",
                                                    iucnUrl: "https://colombia.inaturalist.org/",
                                                    citiesCode: "CITIES002",
                                                    citiesUrl: "https://colombia.inaturalist.org/",
                                                },
                                                {
                                                    name: "Weberbauerocereus rauhii",
                                                    names: ["Name 1", "Name 2"],
                                                    morphology: "Planta robusta de aspecto arbóreo, de hasta 4 m de alto, con un tronco corto y muchas ramas verticales que asemejan un candelabro; ramas de 8-15 cm de diámetro, 23 costillas, con areolas grisáceas cubiertas de fina pubescencia; numerosas espinas blancas en plantas jóvenes y gris blancuzcas en plantas adultas debajo de la zona de floración, hasta 1 cm de largo, con 6 a 7 espinas centrales más gruesas y elongadas, de hasta 4 cm de longitud y una central de hasta 7 cm; espinas amarillentas a marrón oscuro. Zona de floración con solo unas pocas espinas centrales y más espinas elongadas y delgadas; las flores a menudo hacia un solo lado. Flores de aproximadamente 10 cm de longitud y 2 cm de diámetro, tubo floral marrón rojizo, tépalos internos amarillentos con las puntas marrones a rojizas, tépalos externos marrón verdosos; tubo floral densamente cubierto de escamas y pelos marrones; filamentos amarillentos; estigma verdoso sobrepasando la altura de las anteras. Frutos esféricos, de hasta 3 cm de diámetro, marrón rojizos a anaranjados cuando maduros, cubiertos de escamas y pelos lanosos blanquecinos.",
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
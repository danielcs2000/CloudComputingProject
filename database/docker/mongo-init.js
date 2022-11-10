db.createUser(
    {
        user: "cactus_user",
        pwd: "cactus_pass",
        roles: [
            {
                role: "readWrite",
                db: "cactus_db"
            }
        ]
    }
);
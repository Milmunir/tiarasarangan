-- CreateTable
CREATE TABLE "rooms" (
    "id" SERIAL NOT NULL,
    "nomor" VARCHAR(255) NOT NULL,
    "villa" INTEGER NOT NULL,
    "tipe" INTEGER NOT NULL,
    "status" VARCHAR(255) NOT NULL DEFAULT 'kosong',
    "harga" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "email_verified_at" TIMESTAMP(0),
    "password" VARCHAR(255) NOT NULL,
    "remember_token" VARCHAR(100),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" BIGSERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 2,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promo" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "amount" INTEGER,
    "percent" INTEGER,
    "day" JSON DEFAULT '{"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"saturday":true,"sunday":true}',
    "mulai" TIMESTAMP(0),
    "sampai" TIMESTAMP(0),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "promo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guests" (
    "id" BIGSERIAL NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "lembaga" VARCHAR(255),
    "keterangan" VARCHAR(255),
    "hp" VARCHAR(255),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" BIGSERIAL NOT NULL,
    "admin_id" BIGINT NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "before" VARCHAR(255),
    "after" VARCHAR(255),
    "time" DATE NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" SERIAL NOT NULL,
    "noinvoice" VARCHAR(255) NOT NULL,
    "id_ruangan" INTEGER NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL DEFAULT 'notPaid',
    "hp" VARCHAR(255) NOT NULL,
    "dp" INTEGER,
    "asli" INTEGER,
    "total" INTEGER,
    "promo" INTEGER,
    "masuk" TIMESTAMP(0) NOT NULL,
    "keluar" TIMESTAMP(0) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "users"("email");

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_admin_id_foreign" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_id_ruangan_foreign" FOREIGN KEY ("id_ruangan") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

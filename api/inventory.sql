CREATE DATABASE IF NOT EXISTS office_inventory
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE office_inventory;

CREATE TABLE categories (
                            id CHAR(36) NOT NULL,
                            name VARCHAR(150) NOT NULL,
                            description TEXT NOT NULL,
                            PRIMARY KEY (id),
                            UNIQUE KEY uq_categories_name (name)
) ENGINE=InnoDB;

CREATE TABLE locations (
                           id CHAR(36) NOT NULL,
                           name VARCHAR(150) NOT NULL,
                           description TEXT NOT NULL,
                           PRIMARY KEY (id),
                           UNIQUE KEY uq_locations_name (name)
) ENGINE=InnoDB;

CREATE TABLE items (
                       id CHAR(36) NOT NULL,
                       category_id CHAR(36) NOT NULL,
                       location_id CHAR(36) NOT NULL,
                       name VARCHAR(200) NOT NULL,
                       description TEXT NOT NULL,
                       image VARCHAR(255),
                       created_at DATE NOT NULL,

                       PRIMARY KEY (id),

                       KEY idx_items_category_id (category_id),
                       KEY idx_items_location_id (location_id),

                       CONSTRAINT fk_items_category
                           FOREIGN KEY (category_id)
                               REFERENCES categories(id)
                               ON UPDATE CASCADE
                               ON DELETE RESTRICT,

                       CONSTRAINT fk_items_location
                           FOREIGN KEY (location_id)
                               REFERENCES locations(id)
                               ON UPDATE CASCADE
                               ON DELETE RESTRICT
) ENGINE=InnoDB;
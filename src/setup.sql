-- ============================================
-- CSE 340 W02 DATABASE SETUP
-- ============================================

DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS organization;


-- ============================================
-- ORGANIZATION TABLE
-- ============================================

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- ============================================
-- PROJECT TABLE
-- ============================================

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,

    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id)
        ON DELETE CASCADE
);


-- ============================================
-- CATEGORY TABLE
-- ============================================

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);


-- ============================================
-- PROJECT/CATEGORY JUNCTION TABLE
-- ============================================

CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project_category_project
        FOREIGN KEY (project_id)
        REFERENCES project (project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_project_category_category
        FOREIGN KEY (category_id)
        REFERENCES category (category_id)
        ON DELETE CASCADE
);


-- ============================================
-- ORGANIZATION DATA
-- ============================================

INSERT INTO organization
    (name, description, contact_email, logo_filename)
VALUES
    (
        'BrightFuture Builders',
        'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
        'info@brightfuturebuilders.org',
        'brightfuture-logo.png'
    ),
    (
        'GreenHarvest Growers',
        'An urban farming collective promoting food sustainability and education in local neighborhoods.',
        'contact@greenharvest.org',
        'greenharvest-logo.png'
    ),
    (
        'UnityServe Volunteers',
        'A volunteer coordination group supporting local charities and service initiatives.',
        'hello@unityserve.org',
        'unityserve-logo.png'
    );


-- ============================================
-- PROJECT DATA
-- ============================================

INSERT INTO project
    (organization_id, name, description)
VALUES
    (
        1,
        'Community Clean-Up',
        'A volunteer project focused on cleaning public spaces and improving the local environment.'
    ),
    (
        1,
        'Community Construction Support',
        'A service project providing volunteer assistance with community improvement and construction activities.'
    ),
    (
        2,
        'Urban Garden Project',
        'A community gardening project that promotes food sustainability and hands-on learning.'
    ),
    (
        2,
        'Food Sustainability Workshop',
        'An educational project teaching community members about sustainable food production.'
    ),
    (
        3,
        'Community Food Support',
        'A volunteer project designed to provide practical food assistance to community members.'
    ),
    (
        3,
        'Healthy Community Outreach',
        'A service project promoting healthy lifestyles and community wellness awareness.'
    );


-- ============================================
-- CATEGORY DATA
-- ============================================

INSERT INTO category (name)
VALUES
    ('Environmental'),
    ('Educational'),
    ('Community Service'),
    ('Health and Wellness');


-- ============================================
-- PROJECT/CATEGORY RELATIONSHIPS
-- ============================================

INSERT INTO project_category
    (project_id, category_id)
VALUES
    (1, 1),
    (1, 3),
    (2, 3),
    (3, 1),
    (3, 2),
    (4, 2),
    (5, 3),
    (5, 4),
    (6, 4),
    (6, 3);


-- ============================================
-- VERIFICATION QUERIES
-- ============================================

SELECT * FROM organization;
SELECT * FROM project;
SELECT * FROM category;
SELECT * FROM project_category;
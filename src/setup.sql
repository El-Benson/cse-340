-- ============================================
-- CSE 340 W03 DATABASE SETUP
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
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,

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
    (organization_id, title, description, date, location)
VALUES
    -- BrightFuture Builders
    (
        1,
        'Community Clean-Up',
        'A volunteer project focused on cleaning public spaces and improving the local environment.',
        '2026-09-20',
        'Community Park'
    ),
    (
        1,
        'Community Construction Support',
        'A service project providing volunteer assistance with community improvement and construction activities.',
        '2026-09-27',
        'Community Center'
    ),
    (
        1,
        'Neighborhood Renovation Day',
        'A community project helping volunteers improve and maintain shared neighborhood spaces.',
        '2026-11-01',
        'Neighborhood Community Hall'
    ),
    (
        1,
        'Community Center Repair',
        'A volunteer construction project supporting repairs and improvements at a local community center.',
        '2026-11-08',
        'Community Center'
    ),
    (
        1,
        'Safe Playground Improvement',
        'A service project focused on improving a public playground for children and families.',
        '2026-11-15',
        'Community Playground'
    ),

    -- GreenHarvest Growers
    (
        2,
        'Urban Garden Project',
        'A community gardening project that promotes food sustainability and hands-on learning.',
        '2026-10-04',
        'GreenHarvest Community Garden'
    ),
    (
        2,
        'Food Sustainability Workshop',
        'An educational project teaching community members about sustainable food production.',
        '2026-10-11',
        'Community Learning Center'
    ),
    (
        2,
        'Community Garden Expansion',
        'A volunteer project expanding garden space for local food production and community participation.',
        '2026-11-22',
        'GreenHarvest Community Garden'
    ),
    (
        2,
        'Seed and Compost Training',
        'An educational project teaching volunteers how to prepare seeds and compost for community gardens.',
        '2026-11-29',
        'GreenHarvest Learning Center'
    ),
    (
        2,
        'Neighborhood Food Growing Day',
        'A community project encouraging residents to grow fresh food in shared neighborhood spaces.',
        '2026-12-06',
        'Neighborhood Garden'
    ),

    -- UnityServe Volunteers
    (
        3,
        'Community Food Support',
        'A volunteer project designed to provide practical food assistance to community members.',
        '2026-10-18',
        'UnityServe Community Center'
    ),
    (
        3,
        'Healthy Community Outreach',
        'A service project promoting healthy lifestyles and community wellness awareness.',
        '2026-10-25',
        'Community Health Center'
    ),
    (
        3,
        'Volunteer Resource Drive',
        'A community service project collecting useful resources for families and local community programs.',
        '2026-12-13',
        'UnityServe Community Center'
    ),
    (
        3,
        'Senior Support Day',
        'A volunteer project providing practical assistance and community support for older residents.',
        '2026-12-20',
        'UnityServe Community Center'
    ),
    (
        3,
        'Community Wellness Fair',
        'A community event promoting health awareness and access to local wellness information.',
        '2026-12-27',
        'Community Recreation Center'
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
    -- BrightFuture Builders
    (1, 1),
    (1, 3),
    (2, 3),
    (3, 3),
    (4, 3),
    (5, 3),

    -- GreenHarvest Growers
    (6, 1),
    (6, 2),
    (7, 2),
    (8, 1),
    (8, 3),
    (9, 1),
    (9, 2),
    (10, 1),
    (10, 3),

    -- UnityServe Volunteers
    (11, 3),
    (11, 4),
    (12, 3),
    (12, 4),
    (13, 3),
    (14, 3),
    (14, 4),
    (15, 3),
    (15, 4);


-- ============================================
-- VERIFICATION QUERIES
-- ============================================

SELECT * FROM organization;
SELECT * FROM project;
SELECT * FROM category;
SELECT * FROM project_category;
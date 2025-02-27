import db from '../index.js';

async function getAll(req, res, collectionName) {
    try {
        const collection = await db.collection(collectionName).find().toArray();
        res.json(collection);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function getOneByIndex(req, res, collectionName) {
    const { index } = req.params;
        try {
            const car = await db.collection(collectionName).find({}).skip(Number(index - 1)).next();
            if (car) {
                res.json(car);
            } else {
                res.status(404).json({ error: 'Car not found' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
}

async function getOneByParam(req, res, collectionName) {
    const { param, value } = req.body;
    console.log(param, value);

    const query = {};
    query[param] = value;

    try {
        const candidates = await db.collection(collectionName).find(query).toArray();
        if (candidates.length > 0) {
            res.json(candidates);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


class getControllers {
    getCars(req, res) {
        getAll(req, res, 'cars')
    }

    getCarByIndex(req, res) {
        getOneByIndex(req, res, 'cars')
    }


    getAdditionalFeatures(req, res) {
        getAll(req, res, 'additional_features')
    }

    getAdditionalFeatureByIndex(req, res) {
        getOneByIndex(req, res, 'additional_features')
    }


    getUsers(req, res) {
        getAll(req, res, 'users')
    }

    getUserByUsername(req, res) {
        getOneByParam(req, res, 'users')
    }


    // getInsurancePolicies(req, res) {
    //     getAll(req, res, 'insurance_policies')
    // }

    // getInsurancePolicieById(req, res) {
    //     getOne(req, res, 'insurance_policies')
    // }
    

    getSalesActs(req, res) {
        getAll(req, res, 'sales_acts')
    }

    // getSaleAct() {
    //     getOne(req, res, 'sales_acts')
    // }

    
    // getTestDrives() {
    //     getAll(req, res, 'test_drives')
    // }

    // getTestDrive() {
    //     getOne(req, res, 'test_drive')
    // }

}

export default new getControllers();

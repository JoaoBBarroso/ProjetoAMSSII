// #region Positives 
function energy(energy) {
    var pts = 0;
    if (mode == "beverage") {
        if (energy <= 0) {
            pts = 0
        } else if (energy <= 30) {
            pts = 1
        } else if (energy <= 60) {
            pts = 2
        } else if (energy <= 90) {
            pts = 3
        } else if (energy <= 120) {
            pts = 4
        } else if (energy <= 150) {
            pts = 5
        } else if (energy <= 180) {
            pts = 6
        } else if (energy <= 210) {
            pts = 7
        } else if (energy <= 240) {
            pts = 8
        } else if (energy <= 270) {
            pts = 9
        } else if (energy > 270) {
            pts = 10
        }
    } else {
        if (energy <= 335) {
            pts = 0
        } else if (energy <= 670) {
            pts = 1
        } else if (energy <= 1005) {
            pts = 2
        } else if (energy <= 1340) {
            pts = 3
        } else if (energy <= 1675) {
            pts = 4
        } else if (energy <= 2010) {
            pts = 5
        } else if (energy <= 2345) {
            pts = 6
        } else if (energy <= 2680) {
            pts = 7
        } else if (energy <= 3015) {
            pts = 8
        } else if (energy <= 3350) {
            pts = 9
        } else if (energy > 3350) {
            pts = 10
        }
    }
    return pts;
}

function sugar(sugars) {
    var pts = 0;

    // Vérif que le sucre est <= 100
    if (sugars > 100) {
        sugars = 100;
    }

    if (mode == "beverage") {
        if (sugars <= 0) {
            pts = 0
        } else if (sugars <= 1.5) {
            pts = 1
        } else if (sugars <= 3) {
            pts = 2
        } else if (sugars <= 4.5) {
            pts = 3
        } else if (sugars <= 6) {
            pts = 4
        } else if (sugars <= 7.5) {
            pts = 5
        } else if (sugars <= 9) {
            pts = 6
        } else if (sugars <= 10.5) {
            pts = 7
        } else if (sugars <= 12) {
            pts = 8
        } else if (sugars <= 13.5) {
            pts = 9
        } else if (sugars > 13.5) {
            pts = 10
        }
    } else {
        if (sugars <= 4.5) {
            pts = 0
        } else if (sugars <= 9) {
            pts = 1
        } else if (sugars <= 13.5) {
            pts = 2
        } else if (sugars <= 18) {
            pts = 3
        } else if (sugars <= 22.5) {
            pts = 4
        } else if (sugars <= 27) {
            pts = 5
        } else if (sugars <= 31) {
            pts = 6
        } else if (sugars <= 36) {
            pts = 7
        } else if (sugars <= 40) {
            pts = 8
        } else if (sugars <= 45) {
            pts = 9
        } else if (sugars > 45) {
            pts = 10
        }
    }
    return pts;
}

function fat(fat, saturatedFat) {
    var pts = 0;

    // Vérif que les valeurs sont <= 100
    if (fat > 100) {
        fat = 100;
    }
    if (saturatedFat > 100) {
        saturatedFat = 100;
    }

    if (mode == "fat") {
        // Pour les matières grasses, c'est le ratio acides gras saturés / mat grasses qui compte
        var ratio = 0;
        if (parseInt(fat) != 0 && fat != "") {
            ratio = Math.round(saturatedFat / fat * 10000) / 100; // arrondi à 2 décimales
        }

        if (ratio < 10) {
            pts = 0;
        } else if (ratio < 16) {
            pts = 1;
        } else if (ratio < 22) {
            pts = 2;
        } else if (ratio < 28) {
            pts = 3;
        } else if (ratio < 34) {
            pts = 4;
        } else if (ratio < 40) {
            pts = 5;
        } else if (ratio < 46) {
            pts = 6;
        } else if (ratio < 52) {
            pts = 7;
        } else if (ratio < 58) {
            pts = 8;
        } else if (ratio < 64) {
            pts = 9;
        } else if (ratio >= 64) {
            pts = 10;
        }
        return ratio
    } else { // tous les autres cas
        if (saturatedFat <= 1) {
            pts = 0
        } else if (saturatedFat <= 2) {
            pts = 1
        } else if (saturatedFat <= 3) {
            pts = 2
        } else if (saturatedFat <= 4) {
            pts = 3
        } else if (saturatedFat <= 5) {
            pts = 4
        } else if (saturatedFat <= 6) {
            pts = 5
        } else if (saturatedFat <= 7) {
            pts = 6
        } else if (saturatedFat <= 8) {
            pts = 7
        } else if (saturatedFat <= 9) {
            pts = 8
        } else if (saturatedFat <= 10) {
            pts = 9
        } else if (saturatedFat > 10) {
            pts = 10
        }
        return saturatedFat
    }

}

function salt(salt) {
    var pts = 0;

    if (salt <= 90) {
        pts = 0;
    } else if (salt <= 180) {
        pts = 1;
    } else if (salt <= 270) {
        pts = 2;
    } else if (salt <= 360) {
        pts = 3;
    } else if (salt <= 450) {
        pts = 4;
    } else if (salt <= 540) {
        pts = 5;
    } else if (salt <= 630) {
        pts = 6;
    } else if (salt <= 720) {
        pts = 7;
    } else if (salt <= 810) {
        pts = 8;
    } else if (salt <= 900) {
        pts = 9;
    } else if (salt > 900) {
        pts = 10;
    }
    return pts
}
// #endregion

// #region Positives
function protein(proteins) {
    var pts = 0;

    // Vérif que les protéines sont <= 100
    if (proteins > 100) {
        proteins = 100;
    } else if (proteins < 0) {
        proteins = 0;
    }

    if (proteins <= 1.6) {
        pts = 0;
    } else if (proteins <= 3.2) {
        pts = 1;
    } else if (proteins <= 4.8) {
        pts = 2;
    } else if (proteins <= 6.4) {
        pts = 3;
    } else if (proteins <= 8) {
        pts = 4;
    } else if (proteins > 8) {
        pts = 5;
    }
    return pts;
}

function fiber(fibers) {
    var pts = 0;

    // Vérif que les fibers sont <= 100
    if (fibers > 100) {
        fibers = 100;
    }

    if (fibers <= 0.9) {
        pts = 0;
    } else if (fibers <= 1.9) {
        pts = 1;
    } else if (fibers <= 2.8) {
        pts = 2;
    } else if (fibers <= 3.7) {
        pts = 3;
    } else if (fibers <= 4.7) {
        pts = 4;
    } else if (fibers > 4.7) {
        pts = 5;
    }
    return pts;
}

function fruitsandvegetables(fruits) {
    var pts = 0;
    // Vérif que les fruits sont <= 100 %
    if (fruits > 100) {
        fruits = 100;
    }

    if (mode == "beverages") {
        if (fruits <= 40) {
            pts = 0;
        } else if (fruits <= 60) {
            pts = 2;
        } else if (fruits <= 80) {
            pts = 4;
        } else if (fruits > 80) {
            pts = 10;
        }
    } else { // autres cas
        if (fruits <= 40) {
            pts = 0;
        } else if (fruits <= 60) {
            pts = 1;
        } else if (fruits <= 80) {
            pts = 2;
        } else if (fruits > 80) {
            pts = 5;
        }
    }
    return pts;
}
// #endregion

function calcPositive(fruits, fibers, protein) {
    let a = fruitsandvegetables(fruits);
    let b = fiber(fibers);
    let c = protein(protein);
    return a + b + c;
}

function calcNegatives(energy, sugar, fat, saturatedFat, salt) {
    let a = energy(energy);
    let b = sugar(sugar);
    let c = fat(fat, saturatedFat);
    let d = salt(salt);
    return a + b + c + d;
}

/**
 * Calculate Nutriscore for a certain food
 * @param {number} energy 
 * @param {number} sugar 
 * @param {number} fat 
 * @param {number} saturatedFat 
 * @param {number} salt 
 * @param {number} fruits 
 * @param {number} fibers 
 * @param {number} protein 
 */
function calcNutriScore(energy, sugar, fat, saturatedFat, salt, fruits, fibers, protein) {
    return calcNegatives(energy, sugar, fat, saturatedFat, salt) - calcPositive(fruits, fibers, protein);
}

module.exports = calcNutriScore;
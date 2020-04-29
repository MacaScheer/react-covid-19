// const Minor = require("./minor");
// const Teen = require("./teen");
// const Adult = require("./adult");
// const Senior = require("./senior");

const Util = {
    inherits: function inherits(childClass, parentClass) {
        childClass.prototype = Object.create(parentClass.prototype);
        childClass.prototype.constructor = childClass;
    },
    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length)
    },
    // distance
    dist(pos1, pos2) {
        let dist = Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        )
        return dist
    },
    // 
    dir(vec) {
        const norm = Util.norm(vec);
        return Util.scale(vec, 1 / norm)
    },
    norm(vec) {
        return Util.dist([0,0], vec)
    },
    scale(vec, m) {
        return [vec[0] * m, vec[1] * m]
    },
    wrap(coord, max) {
        if (coord < 0) {
            return max - (coord % max);
        } else if (coord > max) {
            return coord % max;
        } else {
            return coord;
        }
    },
    // redirect(mass1, mass2, vel1, vel2) {
    //     debugger

    //     return [newVel1, newVel2]
    // },

    angle(vel) {
        return Math.atan2(vel[0], vel[1])
    },
    
    determineFate(age) {
        let num;
        switch (age) {
            case "minor":
                num = 200;
                break;
            case "teen":
                num = 50;
                break;
            case "adult":
                num = 50;
                break;
            case "senior":
                num = 100;
                break;
            default:
                break;
        }
        let rand = Math.random() * num
        let bool = rand > 10
        console.log("WILL RECOVER: ", bool, " RANDOM NUM: ", rand)
        return bool
    }
    
}

module.exports = Util;


// function ballCollision() {
//     for (let i = 0; i < objArray.length - 1; i++) {
//         for (let j = i + 1; j < objArray.length; j++) {
//             let ob1 = objArray[i]
//             let ob2 = objArray[j]
//             let dist = distance(ob1, ob2)

//             if (dist < ob1.radius + ob2.radius) {
//                 let theta1 = ob1.angle();
//                 let theta2 = ob2.angle();
//                 let phi = Math.atan2(ob2.y - ob1.y, ob2.x - ob1.x);
//                  letting mass = radius for now
//                 let m1 = ob1.mass;
//                 let m2 = ob2.mass;
//                 let v1 = ob1.dist();
//                 let v2 = ob2.dist();

//                 let dx1F = (v1 * Math.cos(theta1 - phi) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi)) / (m1 + m2) * Math.cos(phi) + v1 * Math.sin(theta1 - phi) * Math.cos(phi + Math.PI / 2);
//                 let dy1F = (v1 * Math.cos(theta1 - phi) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi)) / (m1 + m2) * Math.sin(phi) + v1 * Math.sin(theta1 - phi) * Math.sin(phi + Math.PI / 2);
//                 let dx2F = (v2 * Math.cos(theta2 - phi) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - phi)) / (m1 + m2) * Math.cos(phi) + v2 * Math.sin(theta2 - phi) * Math.cos(phi + Math.PI / 2);
//                 let dy2F = (v2 * Math.cos(theta2 - phi) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - phi)) / (m1 + m2) * Math.sin(phi) + v2 * Math.sin(theta2 - phi) * Math.sin(phi + Math.PI / 2);

//                 ob1.dx = dx1F;
//                 ob1.dy = dy1F;
//                 ob2.dx = dx2F;
//                 ob2.dy = dy2F;

//                 staticCollision(ob1, ob2)

//             }
//         }
//         wallCollision(objArray[i]);
//     }

//     if (objArray.length > 0)
//         wallCollision(objArray[objArray.length - 1])
// }

// function staticCollision(ob1, ob2, emergency = false) {
//     let overlap = ob1.radius + ob2.radius - distance(ob1, ob2);
//     let smallerObject = ob1.radius < ob2.radius ? ob1 : ob2;
//     let biggerObject = ob1.radius > ob2.radius ? ob1 : ob2;

//     // When things go normally, this line does not execute.
//     // "Emergency" is when staticCollision has run, but the collision
//     // still hasn't been resolved. Which implies that one of the objects
//     // is likely being jammed against a corner, so we must now move the OTHER one instead.
//     // in other words: this line basically swaps the "little guy" role, because
//     // the actual little guy can't be moved away due to being blocked by the wall.
//     if (emergency) [smallerObject, biggerObject] = [biggerObject, smallerObject]

//     let theta = Math.atan2((biggerObject.y - smallerObject.y), (biggerObject.x - smallerObject.x));
//     smallerObject.x -= overlap * Math.cos(theta);
//     smallerObject.y -= overlap * Math.sin(theta);

//     if (distance(ob1, ob2) < ob1.radius + ob2.radius) {
//         // we don't want to be stuck in an infinite emergency.
//         // so if we have already run one emergency round; just ignore the problem.
//         if (!emergency) staticCollision(ob1, ob2, true)
//     }
// }


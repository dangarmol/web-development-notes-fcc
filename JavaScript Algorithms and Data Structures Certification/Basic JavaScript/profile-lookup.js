// Setup
var contacts = [
    {
        "firstName": "Akira",
        "lastName": "Laine",
        "number": "0543236543",
        "likes": ["Pizza", "Coding", "Brownie Points"]
    },
    {
        "firstName": "Harry",
        "lastName": "Potter",
        "number": "0994372684",
        "likes": ["Hogwarts", "Magic", "Hagrid"]
    },
    {
        "firstName": "Sherlock",
        "lastName": "Holmes",
        "number": "0487345643",
        "likes": ["Intriguing Cases", "Violin"]
    },
    {
        "firstName": "Kristian",
        "lastName": "Vos",
        "number": "unknown",
        "likes": ["JavaScript", "Gaming", "Foxes"]
    }
];


function lookUpProfile(name, prop){
// Only change code below this line
    var i = 0;
    var foundIndex = -1;
    while(i < contacts.length) {
        if(contacts[i].firstName == name) {
            foundIndex = i;
            break;
        }
        i++;
    }
    if(foundIndex == -1) {
        return "No such contact";
    } else if(contacts[foundIndex].hasOwnProperty(prop)) {
        return contacts[foundIndex][prop];
    } else {
        return "No such property";
    }
// Only change code above this line
}

lookUpProfile("Akira", "likes");

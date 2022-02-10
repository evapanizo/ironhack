// Names and Input
/// 1 - 2 - 3 - 4
const hacker1 = "Eva";
console.log(`The driver's name is ${hacker1}.`);
const hacker2 = window.prompt("What's the navigator's name?");
console.log(`The navigator's name is ${hacker2}.`);

// Conditionals
/// 5
if (hacker1.length > hacker2.length) {
  console.log(`The Driver has the longest name, it has ${hacker1.length} characters.`);
} else if (hacker2.length > hacker1.length) {
  console.log(`Yo, navigator got the longest name, it has ${hacker2.length} characters.`);
} else {
  console.log(`Wow, you both got equally long names, ${hacker1.length} characters!!`);
}

// Loops
/// 6
newString = "";
for ( let i = 0; i < hacker1.length; i++) {
  newString += `${hacker1[i].toUpperCase()} `;
}
console.log(newString.substring(0, newString.length-1));

/// 7
newString = "";
for ( let i = hacker2.length-1; i >= 0 ; i--) {
  newString += hacker2[i];
}
console.log(newString);

/// 8
if (hacker1 < hacker2) {
  console.log("The driver's name goes first.");
} else if (hacker2 < hacker1) {
  console.log("Yo, the navigator goes first definitely.");
} else {
  console.log("What?! You both got the same name?");
}

// Bonus Time
/// 9
let userString = window.prompt("Please, write something:").toLowerCase();

userString = userString.replace(/[^a-z]/g, "");

reverseString = ""
for ( let i = userString.length-1; i >= 0 ; i--) {
    reverseString += userString[i];
}

const isPalindrome = "Your string is a Palindrome! Congratulations!!!!";
const isNotPalindrome = "Your string is not a Palindrome!";
userString === reverseString ? console.log(isPalindrome) : console.log(isNotPalindrome);

/// 10
const lorem = "Lorem ipsum dolor sit amet consectetur adipiscing elit potenti aliquet, elementum erat senectus malesuada vestibulum arcu blandit sapien auctor, nibh lacus aenean porta fames congue odio facilisi. Pulvinar magna velit interdum convallis fames a vulputate vivamus quisque, sociosqu quis litora odio tempus ullamcorper justo integer, facilisis magnis condimentum feugiat in netus rutrum risus. Natoque ac sem fusce fringilla morbi mollis, himenaeos pulvinar dis habitasse aliquet malesuada pharetra, sodales fermentum congue suspendisse senectus. Gravida netus mi accumsan sem malesuada cum fermentum integer ullamcorper tempus viverra montes suspendisse sociis, senectus dictumst vivamus donec nec torquent porta condimentum vulputate nulla nibh litora venenatis. Congue tempus est integer vestibulum magna nisi, varius semper habitant neque pulvinar consequat, viverra platea placerat netus posuere. Felis iaculis purus quam tincidunt nunc turpis ullamcorper ultricies pretium, rutrum vehicula torquent vel laoreet est nascetur placerat dapibus lacus, blandit penatibus nibh sodales habitasse sociis ad metus. Nunc felis montes viverra suspendisse luctus eget nam velit, iaculis sollicitudin sociosqu tristique lobortis cras morbi, torquent in integer mus posuere per consequat. Donec molestie vivamus diam porta phasellus ultrices quis sociosqu curae ad, parturient elementum rhoncus proin felis libero eget convallis turpis dui, suscipit nunc vulputate iaculis inceptos semper fermentum lacus ornare. Duis iaculis aenean netus ultrices tristique dictum luctus convallis, non varius rhoncus faucibus ad fames aliquet at, feugiat inceptos pellentesque curae scelerisque leo posuere. Justo convallis pulvinar ut ultrices rhoncus auctor feugiat ullamcorper primis gravida aptent, class nibh orci volutpat semper eget erat cubilia egestas nec, faucibus sociis donec mollis eu ultricies sociosqu non ac sagittis."
console.log(`The text has ${lorem.split(" ").length} words.`)

let etArray = lorem.match(/ et /g);
const etCount = (etArray === null ? 0 : etArray.length);
console.log(`The text has ${etCount} et.`);
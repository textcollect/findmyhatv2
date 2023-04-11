var prompt = require('prompt-sync')({sigint: true});

// run in terminal: npm i clear-screen
// provides clear() fn to Clear your console buffer
const clear = require('clear-screen'); 

// Create some global variables (remember: const variables cannot be changed later)
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;
const field = []; //create an empty array first

// Global variables for indexes to put hat in
let hatRow = Math.floor((Math.random() * 10)), hatCol = Math.floor((Math.random() * 10));

//initialise values for the 2d array - 1 & 2 is for character, 3 & 4 is to put back the field
let index1 = 0, index2 = 0, index3 = 0, index4 = 0; 



// function to generate the field
const generateField = () => 
{
    // Nested for-loop
    //outer loop for row, inner for column
    for (let i = 0; i < row; i++)
    {
        // Create 2D array
        field[i] = []; //empty array for each row

        for (let j = 0; j < col; j++)
        {
            field[i][j] = fieldCharacter; //generates 10 fieldCharacters in i-th row
        }
    } //End of nested for-loop

} //End of generateField function


// function to generate holes, hat & character
const specialGenerator = () =>
{
    let i = 0;

    // while loop to generate holes randomly
    // Math.floor((Math.random() * (row * col -1)) + 1) will make the loop go for 99 times at most which is less than the field generated
    // each time the loop starts, a hole will be generated at a random row and column from 0 to 10
    while (i < Math.floor((Math.random() * (row * col -1)) + 1))
    {
        field[Math.floor((Math.random() * 10))][Math.floor((Math.random() * 10))] = hole;
        i++;
    }

    //generate hat at a random position that is not (0, 0).
    //if random index is (0, 0), make it (1, 0).
    if (!(hatRow == 0 && hatCol == 0))
    {
        field[hatRow][hatCol] = hat;
    }
    else
    {
        hatRow++;
        field[hatRow][hatCol] = hat;
    }

    //Character generation
    field[0][0] = pathCharacter;
}


// function to print out the field in the console
const print = () =>
{
    // Clear console buffer first
    clear();

    const displayField = field.map(row =>
        {
            return row.join('');
        }).join('\n');

    
    console.log(displayField);
    //console.log(typeof(displayField)); //string

}



// function to prompt for user input
const askQuestion = () =>
{
    const doYouKnowTheWay = prompt('Which way? ').toLowerCase();

    //Change array element depending on user input
    switch (doYouKnowTheWay)
    {
        case 'u':
            index3 = index1;
            index4 = index2;
            index1--;
            break;

        case 'd':
            index3 = index1;
            index4 = index2;
            index1++;
            break;

        case 'l':
            index3 = index1;
            index4 = index2;
            index2--;
            break;

        case 'r':
            index3 = index1;
            index4 = index2;
            index2++;
            break;

        default:
            index1, index2, index3, index4;
            console.log("Enter (u, d, l or r)");
            askQuestion();
            break;
    } //End of switch-case

    return [index1, index2, index3, index4]; // Return an array containing the index values   
} //End of askQuestion()


const startGame = () =>
{
    let isPlaying = true;

    while (isPlaying)
    {
        print();
        askQuestion();

        if (index1 < 0 || index1 > 10 || index2 < 0 || index2 >10 )
        {
            console.log("Out of bounds - Game End!");
            isPlaying = false;
        }
        else if (field[index1][index2] == hole)
        {
            console.log("Sorry, you fell down a hole!");
            isPlaying = false;
        }
        else if (index1 == hatRow && index2 == hatCol)
        {
            console.log("Congrats, you found your hat!");
            isPlaying = false;
        }
        else
        {
            field[index1][index2] = pathCharacter;
            field[index3][index4] = fieldCharacter;
        }
    }
}

generateField();
specialGenerator();
startGame();
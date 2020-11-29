# Timetable Assist Tool
## Overview
With an increasing number of constraints in slot and classroom allotment to courses, the difficulty increases, making it time-consuming and error-prone to do it manually. Hence there is a need for a convenient, correct, and efficient solution that can be extended in the future. The Time Table Assist tool fills this need, satisfying different constraints in course scheduling. Since this is a web-based application, the CRC team does not have to manually install it on different machines and work with multiple dependencies.

Please visit the Wiki tab for more information on usage.

## Getting Started
Following are the steps to run the application locally on your machine. 

1. Install 'nodejs': `sudo apt install nodejs` for Ubuntu.
2. Install 'npm': `sudo apt install npm` for Ubuntu.
3. Install node modules by running `npm install` in the TimetableApp directory
4. Install python packages from requirements document: `pip install -r requirements.txt`.
5. Run the flask server using `flask run` in the project's root
6. Run the app using the npm script `npm start`

Visit `localhost:8080` on your browser to access the application. <br>
Once the application is hosted on a server, none of the above steps and requirements is necessary to be performed locally. It can then be easily accessed through a URL on the IIT Mandi network. 

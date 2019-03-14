This application is Mancala game. Where user may create a game and receive a link, which will serve as connection link for other player. Creator should provide: username and game name, whereas user which wants to connect provides: username and link to the game.

# **Technology stack:**<br/>
Java 8, Maven, Spring Boot 2.1.3.RELEASE, Spring WebSockets, JUnit, Lombok, Angular 5.

# **Getting started:** <br/>
To get started with this application you should have installed on your computer such things as: JDK 8, Nodejs, Maven. <br/>
*To make things easy I didn't use a database to store game links, instead I used a HashMap* <br/>
    
## **Before running the application do not forget to install all dependecies!<br/>**

### Back end:<br/>
Go to the root folder, open the command line and type here: `mvn clean install` - this command will install all neccessary dependencies for back end side.

### Front end:<br/>
Go to the frontend folder (`src/main package`), open the command line and type here: `npm install` - this command will install all neccessary dependencies for the front end. 

# **How to run the application**:<br/>
To run this application go to the root folder open the command line and type here: `mvn spring-boot:run`. This will start the back end server. Now, go to the frontend folder in `src/frontend package` and again open the command line and type here: `npm start` - this command will start the front end server.
<br/>

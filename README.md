# Dream Team Clothing Supply - SDC

# Git Workflow -->
  *- courtesy TM -*
  ```
  1. git checkout -b <branch_name> (this creates a new branch and checks out to that same branch)
  2. do work
  3. commit (add, commit)
  4. git checkout master
  5. git pull origin master (these last 2 steps are just to make sure your local master is up to date. You don't need it for the next few steps)
  6. git checkout <branch_name>
  7. git pull origin master
  8. fix conflicts! (tells you on command line where to look in editor)
  9. git push origin <branch_name>
  10. Submit a pull request on github
  11. Once it has been approved, tell teammates to git pull origin master
  ```

# Getting Started -->

  *- Install dependancies:
  ```
  $ nmp install
  ```

  *- Start Server:
  ```
  $ npm start
  ```

# Schemas -->

### -- SQL Schema --
  - SQL/Postgres -

![SQL Schema](./images/SQLSchema.png)

### -- NoSQL Schema --
  - MongoDB/Mongoose -

![Mongo Schema](./images/mongoSchema.png)
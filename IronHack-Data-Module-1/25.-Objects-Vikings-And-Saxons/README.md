# Lab | Classes: Vikings vs Saxons

## Introduction

In this lab you will work with all the concepts you have learned about *classes* in Python and you will edit a Python module for the first time.

The main goals of this lab are:
- Editing and importing your first module.
- Defining classes with properties and methods. 
- Creating and using instances of a class object. 

### Getting Started

This lab has two parts: 
- First, you will need to modify the Python module included in this repository by following the lab instructions below. The module is called `battle` and it contains a file called `soldiers.py`, which you will need to edit. 

- Second, you will import the module and use it to instantiate objects. Then, you will create a simple program using those objects. To do so, follow the instructions in the `main.ipynb` file included in the present repository. 

### Deliverables

You must deliver the following files with the corresponding solutions:

- `soldiers.py`
- `main.ipynb`

### Submission
Upon completion, add your deliverables to git. Then commit and push your branch to the remote.

## Challenge
The Vikings and the Saxons are at war. Both are soldiers, however, they have their own particular characteristics such as fighting styles and stamina. 

<div style="text-align:center">
  <img src="https://media.giphy.com/media/16ZmZSmOTSgrS/giphy.gif" width=400px>
</div>

Your tasks for this challenge are:
- Complete the `battle` module. You will need to edit the `soldiers.py` file to complete the definition of the three different classes included in that file: `Soldier`, `Viking` and `Saxon`.
- Use the `battle` module to create the most epic battle ever. 

To complete those tasks, follow the instructions below.

### Part I: Prepare your soldiers
In part I, you will equip your soldiers for battle. 

Your task is to modify the `battle` module. Open `soldiers.py` and edit the classes `Soldier`, `Viking` and `Saxon` so that they meet the requirements specified below:

#### Soldier

**Properties**

`Soldier` must have two main properties: *health* and *strength*.

**Methods**

`Soldier` must have two methods:
- `attack`
  - Mustn't receive any arguments.
  - Must return the *strength* of the soldier. 
- `receive_damage`
  - Must receive as an argument the *damage* inflicted to the soldier. 
  - Must remove the received *damage* from the *health* property of the soldier.

#### Viking
A `Viking` is a `Soldier` with additional properties. 

**Inheritance**
`Viking` must inherit from `Soldier`. Vikings share the *health* and *strength* properties with soldiers, as well as the *attack* method.  

**Properties**
Apart from the inherited *health* and *strength*, `Vikings` must have an extra property called *name*. 

**Methods**
- `attack`: this method must be inherited from `Soldier`. 
- `receive_damage`: this `Viking` method is slightly more sofisticated than the `Soldier` one. 
  - Must receive as an argument the *damage* inflicted to the soldier. 
  - Must remove the received *damage* from the *health* property of the soldier.
  - If the `Viking` is still alive, the method must return "NAME has received DAMAGE points of damage".
  - If the `Viking` dies, the method must return "NAME has died in combat".
- `battle_cry`
  - Mustn't receive any arguments.
  - Must return **"Odin Owns You All!"**.

#### Saxon
A `Saxon` is a nameless and apathetic kind of `Soldier`: saxons have no name and no battle cry.  

**Inheritance**
`Saxon` must inherit from `Soldier`. Saxons share the *health* and *strength* properties with soldiers, as well as the *attack* method.  

**Properties**
All `Saxon` properties are inherited from `Soldier`. 

**Methods**
- `attack`: this method must be inherited from `Soldier`. 
- `receive_damage`: this `Saxon` method is slightly more sofisticated than the `Soldier` one. 
  - Must receive as an argument the *damage* inflicted to the soldier. 
  - Must remove the received *damage* from the *health* property of the soldier.
  - If the `Saxon` is still alive, the method must return "A Saxon has received DAMAGE points of damage".
  - If the `Saxon` dies, the method must return "A Saxon has died in combat".

### Part II: This is war!
In part II, the moment to fight has come! Prepare your armies and head to the battlefield!

Open the `main.ipynb` file and follow the instructions to simulate a war between saxons and vikings. 

## Resources
- [Python Tutorial: Inheritance](https://www.python-course.eu/python3_inheritance.php)
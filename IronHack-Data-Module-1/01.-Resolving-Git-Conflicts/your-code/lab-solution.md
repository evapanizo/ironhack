
## Step 1 - Check Local Branch Status

 * git status

````
En la rama master
nada para hacer commit, el árbol de trabajo esta limpio
````
## Step 2 - Stage and Commit Changes (Optional)

## Step 3 - Pull Latest Changes From the Remote Branch

* git pull origin master

````
Desde https://github.com/evapanizo/IronHack-Data-Module-1
 * branch            master     -> FETCH_HEAD
Ya está actualizado.
````

## Step 4 - Resolve Conflicts (Optional)

## Step 5 - Create Conflicting Changes

1.- After changing "your-code/about-me.md"...

* git status
* git add .
* git commit -m "Add about me v1.0”
* git push origin master

2.- Find out the ID of the commit prior to your latest commit.

* git log

Use *q* to exit the text file.

The ID of the commit prior to the latest is 2d5a035a77bc3ac329b5ca0ea90b7739846c53de.

The ID of my latest commit is f3afbc999356fc3fe9f0bb4cb5e335234c580c15. 

3.- Revert to the commit before you made the latest change.

* git reset --hard 2d5a035a77bc3ac329b5ca0ea90b7739846c53de

````
HEAD está ahora en 2d5a035 Delete .DS_Store
````

* git log --graph --oneline --all 

````
* f3afbc9 - (hace 8 minutos) Add about me v1.0 - Eva Panizo (origin/master)
* 2d5a035 - (hace 25 minutos) Delete .DS_Store - Eva Panizo (HEAD -> master)
* 6c67366 - (hace 27 minutos) Add .gitignore - Eva Panizo
* e66fafb - (hace 28 minutos) First commit - Eva Panizo
````

4.- Create a new branch.

* git checkout -b lab-resolving-git-conflicts 

````
Cambiado a nueva rama 'lab-resolving-git-conflicts'
````

5.- Open "your-code/about-me.md" and edit it using the template.

6.- Update "your-code/about-me.md" and create the conflict.

* git add .
* git commit -m “Add completed intro template”
* git log
* git log --graph --oneline --all 

````
* 53f9732 - (hace 2 minutos) Add completed intro template - Eva Panizo (HEAD -> lab-resolving-git-conflicts)
| * f3afbc9 - (hace 31 minutos) Add about me v1.0 - Eva Panizo (origin/master)
|/
* 2d5a035 - (hace 48 minutos) Delete .DS_Store - Eva Panizo (master)
* 6c67366 - (hace 50 minutos) Add .gitignore - Eva Panizo
* e66fafb - (hace 51 minutos) First commit - Eva Panizo
````

The ID of the new commit is 53f97322ac86bf2b129a8d3d4fd631ea7846272f.

* git pull origin master

````
Desde https://github.com/evapanizo/IronHack-Data-Module-1
 * branch            master     -> FETCH_HEAD
Auto-fusionando 01.-Resolving-Git-Conflicts/your-code/about-me.md
CONFLICTO (contenido): Conflicto de fusión en 01.-Resolving-Git-Conflicts/your-code/about-me.md
Fusión automática falló; arregle los conflictos y luego realice un commit con el resultado.
````

## Step 6 - Resolve Conflicts
* code .
* Accept current changes

## Step 7 - Commit and push Changes

* git add .
* git commit -m "resolving conflicts with master branch"
* git push origin lab-resolving-git-conflicts
* git checkout master
* git merge lab-resolving-git-conflicts
* git push origin master

````
*   1cdce7a (HEAD -> master, origin/master, origin/lab-resolving-git-conflicts, lab-resolving-git-conflicts) resolving conflicts with master branch
|\
| * f3afbc9 Add about me v1.0
* | 53f9732 Add completed intro template
|/
* 2d5a035 Delete .DS_Store
* 6c67366 Add .gitignore
* e66fafb First commit
````

## Step 8 - Make Pull Request

* GitHub > Lab repo > Pull requests > New Pull Request 
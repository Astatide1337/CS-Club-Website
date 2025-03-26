---

title: "Arrow Collector - Soham Bhagat"
excerpt: "Explore an exciting game project developed as a final project, featuring physics-based movement, shooting mechanics, and dynamic gameplay."
category: "Student Project"
coverImage: "/PostsImages/ArrowCollector.jpg"
date: "2025-03-21T05:35:07.322Z"
author:
name: "Soham Bhagat"
picture: "/PostsImages/ArrowCollector.jpg"
ogImage:
url: "/PostsImages/ArrowCollector.jpg"
--------------------

## Arrow Collector - A Physics-Based Game

Welcome to the showcase of *Arrow Collector*, a game developed as a final project by Soham Bhagat. This game combines physics-based movement, bow mechanics, and scoring systems to create an engaging and interactive experience.

### About the Game

*Arrow Collector* is a skill-based game where the player controls a character equipped with a bow, aiming to collect arrows and maintain their score while avoiding obstacles. The game features:

- **Physics-based movement**: Simulated gravity and drag for realistic player motion.
- **Bow mechanics**: Players can aim and shoot arrows with directional control.
- **Scoring system**: Points are awarded based on collected arrows.
- **Collision detection**: Ensures interaction between the player and in-game objects.
- **Game-over conditions**: Score tracking and high-score saving add replayability.

### Key Features

#### Player Mechanics

The player character can move dynamically with applied physics, including gravity and drag. Shooting an arrow requires aiming with the mouse, determining trajectory, and adding force to propel the projectile.

#### Object Interactions

The game includes refillable arrow pickups, which spawn at random locations, encouraging movement and strategy. The player must navigate the screen while avoiding falling off the play area.

#### Sound & Graphics

- **Background music & sound effects** enhance the game atmosphere.
- **Custom sprites and animations** for immersive gameplay.
- **Collision-based interactions** trigger sound effects and score updates.

### How It Works

The game runs using **Pygame**, a Python library for game development. Below is a snippet of the core mechanics, illustrating how the player interacts with the game world:

```python
class Player():
    def __init__(self):
        self.position = pygame.Vector2(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 5)
        self.velocity = pygame.Vector2()
        self.bow = Bow()
        self.arrows = 5
        self.score = 0

    def move(self):
        self.velocity.y -= 2  # Simulated gravity
        self.position.x -= self.velocity.x * 0.02
        self.position.y -= self.velocity.y * 0.02

    def shoot(self):
        if self.arrows > 0:
            self.arrows -= 1
            print("Arrow shot!")
```



### Check Out the Game!\*\* &#x20;

We’re incredibly proud of what we built and excited to share it with the world. You can explore the project, view the source code, and even contribute on GitHub:  **[Arrow Collector](https://github.com/Astatide1337/Pygame)**


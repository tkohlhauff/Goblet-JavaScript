# Goblet-JavaScript
    **                                                                                           **
    ***********************************************************************************************
      *******************************************************************************************
        ***************************************************************************************
                   ▄█████▄     ▄████▄   ▀███████▄    ▄         ▄██████▄      ▄▀▀█▀█▄ ▄
                 ▄██     ██▄  ██    ██    ██   ██  ▄██        ▀██    ▀██    ▀  ▄█  ▀██
                 ██       ██  ██    ██    ██   ██   ██         ██     ▀▀       ██   
                 ██           ██    ██   ▄██▄▄█▀    ██         ██▄▄▄▄          ██    
                 ██      ▄██  ██    ██  ▀▀██▀▀▀█▄   ██         ██▀▀▀▀          ██     
                 ██        █  ██    ██    ██    █▄  ██         ██              ██     
                 ██▄     ██   ██    ██    ██    ██  ██     ▄   ██      ▄       ██   ▄ 
                  ▀██▄▄██▀     ▀████▀   ▄███████▀   ██▄▄▄██    ▀██▄▄▄██        ▀██▄▀   
            *******************************************************************************
              ****************************************************************************
                 **********************************************************************
                    ****************************************************************
                        ********************************************************
                          ****************************************************
                                        ************************
                                        ************************
                                        ************************
                                        ************************
                                        ************************
                                        ************************
                                        ************************
                                        ************************
                                        ************************
                                   **********************************
                                  ************************************
        
        **************************************************************************************
                                              Story 
        **************************************************************************************
        

        **************************************************************************************
                                             Controls 
        **************************************************************************************
        
        Implemented:
            [A]             - Start Game
            [Arrow Keys]    - Move left/right; jump
              + [Shift]     - Sprint
            [Space]         - Fire Projectile
            
        Intend to Add:
            [Esc]           - Pause
            [1]             - Change to light attack
            [2]             - Change to heavy attack

        **************************************************************************************
                                             Levels 
        **************************************************************************************
        
        • Midgard - Earth
            • Wizard's Tower - attain Frost Staff of Buri
            • Knight's Armory - Attain Volstagg's Battle Axe
            • Rogue's Fence - attain Ullyr's Bow
            • Jester's Brothel - attain Borr's Bag of Bombs
                • Level up
        • Alfheim - Home of light elves
            • Plains
            • Cave of Dark Elves
            • Forest of Light Elves
            • Freyr's Palace
                • Gain first part of the Goblet; level up; attain Electric Staff of Magni
        • Muspell - Ninth world guarded by the giant, Surt. Home of the Sons of Muspell
            • Desert Dunes
            • Stone Pyramid
            • Tomb of the Gods
            • Surt's Throne
                • Gain second part of the Goblet; level up; attain Flame Staff of Surt
        • Helheim - Hell
            • Spring of Hvergelmir
            • River of Gjoll
            • Gnipahellir Cave - Garm's (Guard Hound - Akin to cerberus) Cave
            • Hraesvelg's Perch - Giant "corpse eater" that overlooks helheim; causes wind to blow in the shape of an eagle
            • Throne of Hel - Monster that rules Helheim
                • Gain third part of the Goblet; level up; attain Stone Staff of Fjorgyn
        • Asgard - Home of the Gods and Asgardians
            • Valhalla - Hall of Fallen Warriors
            • Bifrost Bridge - Connection to all 9 realms
            • Mimir's Well - Guarded by the head of Mimir
            • Root of Yggdrasil - Big ass tree; tree of worlds

        **************************************************************************************
                                              Items 
        **************************************************************************************
        

        **************************************************************************************
                                            Characters 
        **************************************************************************************
        Player should be able to select their character from the "Start Game" action & make a name.
            
        Character Types:
            
        - Wizard
            • Health: 100
            • Mana: 200
                • Mana Regen: Medium speed
            • Movement Speed: 3
            • Sprint Speed: 1.5x movement speed
            
            • Attack Types
                • Arcane Staff of Frigg - Arcane - Pure magic attacks that apply a flat amount of damage. (Starting Power).
                        • Arcane Bolt - Mid/long-range projectile. Low damage, fast fire rate.
                            Damage: 2.5
                            Mana Cost: 5 Mana
                            Projectile Speed: 15
                            Cooldown: 0.25 sec
                        • Laser - Long-range laser fired until it hits an obstacle.
                            Damage: 10/s
                            Mana Cost: 10 Mana/s
                            Cooldown: 5 sec
                • Frost Staff of Buri - Ice - Freezes and slows enemies
                        • Snowball - Mid/long-range projectile. Low damage, medium fire rate.
                            Damage: 5
                            Mana Cost: 5 Mana
                            Projectile Speed: 10
                            Slow Length: 1.5 sec
                            Cooldown: 0.45 sec
                        • Frost Breath - Short/mid-range projectile. Medium damage, slow fire rate. Freezes enemies
                            Damage: 20
                            Mana Cost: 50 Mana
                            Freeze Length: 3 sec
                            Projectile Speed: 7.5
                            Cooldown: 10 sec
                • Flame Staff of Surt - Fire - Adds burn to enemies (Damage Over Time)
                        • Fireball - Mid/long-range projectile. Adds a burn (Damage Over Time).
                            Total Damage: 7.5
                            Mana Cost: 15 Mana
                            Time Inflicted: 2 sec
                            Projectile Speed: 10
                            Cooldown: 0.75 sec
                        • Flame - Short/mid-range channel of fire. Burns enemies. 
                            Total Damage: 7.5/s
                            Mana Cost: 20 Mana/s
                            Time Inflicted: 4 sec
                            Cooldown: 3 sec on release
                • Electric Staff of Magni - Lightning - Can chain attack to nearby enemies.
                        • Lightning Bolt - Mid/long-range projectile.
                            Damage: 3
                            Mana Cost: 10 Mana
                            Fire Speed: 2/s
                            Chain Count: 2
                            Projectile Speed: 25
                            Cooldown: 0.5 sec
                        • Spark - Short/Mid-range Lightning channel. 
                            Damage: 5/s
                            Mana Cost: 17.5 Mana/s
                            Chain Count: 4
                            Cooldown: 3 sec on release
                • Stone Staff of Fjorgyn - Earth - Can knock enemies back; Crowd control.
                        • Rock Throw - Mid-range projectile. Knocks back first enemy hit.
                            Damage: 5
                            Mana Cost: 20 Mana
                            Slow Time: 2 sec
                            Projectile Speed: 5
                            Cooldown: 1 sec
                        • Stone Wall - Short-range destructable obstacle to prevent all projectiles and characters from passing through.
                            Damage: --
                            Mana Cost: 50 Mana
                            Health: 50
                            Cooldown: 7.5 sec
                            Active Time: 5 sec
                            Height: 1.5x player character height.
                    
        - Knight
            • Health: 200
            • Rage: 100
                • Rage Regen: Slow out-of-combat, fast in-combat. 25% regen per kill
            • Movement Speed: 3
            • Sprint Speed: 1.25x - 1.65x movement speed (Increases over time)
            
            • Attack Types
                • Sword of Frey - Medium speed, mid-range melee weapon
                        • Hack & Slash
                            Damage: 10
                            Rage Cost: 5 Rage
                            Attack Speed: 2/s
                        • Stab
                            Damage: 15
                            Rage Cost: 33 Rages
                            Cooldown: 1 sec (Reset on kill)
                • Volstagg's Battle Axe - Medium speed, mid-range melee weapon
                        • Swipe
                            Damage: 12.5
                            Rage Cost: 7.5 Rage
                            Attack Speed: 1.5/s
                        • Slice
                            Damage: 17.5
                            Rage Cost: 50 Rage
                            Attack Speed: 1/s
                            Cooldown: 2 sec (Reset on kill)
                • Thor's Hammer - Slow speed, mid-range, heavy force melee weapon
                        • Swing - Short/mid-range melee attack. Knocks enemies back
                            Damage: 15
                            Rage Cost: 10 Rage
                            Attack Speed: 1/s
                        • Slam - Short-range melee attack, AOE damage. Stuns enemies affected
                            Damage: 20
                            Rage Cost: 50 Rage
                            Cooldown: 3 sec (Reset on kill)
        - Rogue
            • Health: 100
            • Energy: 200
                • Energy Regen: Fast Speed
            • Movement Speed: 3
            • Sprint Speed: 2.0x movement speed
            
            • Attack Types
                • Fandral's Sabre - Short-range, fast attack speed melee weapon
                        • Slash
                            Damage: 5
                            Energy Cost: 5 Energy
                            Cooldown: 0.25 sec
                        • Stab
                            Damage: 7.5
                            Energy Cost: 15 Energy
                            Cooldown: 0.5 sec
                • Ullyr's Bow - Mid/long-range projectile
                        • Quick Fire
                            Damage: 5
                            Energy Cost: 5 Energy
                            Cooldown: 0.33 sec
                        • Precise Shot
                            Damage: 15
                            Energy Cost: 25 Energy
                            Cooldown: 1.0 sec
                
        - Joker/Jester
            • Health: 150
            • Energy: 150
                • Energy Regen: Fast Speed
            • Movement Speed: 3
            • Sprint Speed: 1.75x movement speed
            
            • Attack Types
                • Loki's Dagger/Fenrir's Tooth - Shortest-range, fastest attack speed melee weapon
                        • Slash
                            Damage: 3
                            Energy Cost: 5 Energy
                            Cooldown: 0.15 sec
                        • Poke
                            Damage: 7.5
                            Energy Cost: 15 Energy
                            Cooldown: 1.0 sec
            
                • Borr's Bag of Bombs
                        • Firecracker
                            Damage: 15
                            Energy Cost: 15 Energy
                            Explosion Time: on-impact
                            Cooldown: 1.0 sec
                        • Sabotage
                            Damage: 30
                            Energy Cost: 50 Energy
                            Explosion Time: 3 sec
                            Cooldown: 5 sec











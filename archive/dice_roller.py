#!/usr/bin/env python3
"""
3d6 Dice Roller Simulator

This script simulates rolling 3 six-sided dice and displays:
- Individual die results
- Total sum
- Option to roll again
"""

import random


def roll_dice():
    """Roll a single six-sided die and return the result."""
    return random.randint(1, 6)


def roll_3d6():
    """Roll 3 six-sided dice and return the results."""
    die1 = roll_dice()
    die2 = roll_dice()
    die3 = roll_dice()
    return die1, die2, die3


def display_results(die1, die2, die3):
    """Display the dice roll results in a formatted way."""
    total = die1 + die2 + die3
    
    print("\n" + "="*30)
    print("      3D6 DICE ROLL RESULTS")
    print("="*30)
    print(f"Die 1: {die1}")
    print(f"Die 2: {die2}")
    print(f"Die 3: {die3}")
    print("-" * 30)
    print(f"Total: {total}")
    print("="*30)


def main():
    """Main function to run the dice roller."""
    print("Welcome to the 3d6 Dice Roller!")
    print("Press Enter to roll dice, or type 'quit' to exit.")
    
    while True:
        user_input = input("\nPress Enter to roll (or 'quit' to exit): ").strip().lower()
        
        if user_input == 'quit':
            print("Thanks for playing!")
            break
        
        # Roll the dice
        die1, die2, die3 = roll_3d6()
        display_results(die1, die2, die3)


if __name__ == "__main__":
    main()
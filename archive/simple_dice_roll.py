#!/usr/bin/env python3
"""
Simple 3d6 Dice Roller

This script performs a single roll of 3 six-sided dice and displays the results.
Run this script multiple times to get different results.
"""

import random


def main():
    """Roll 3d6 and display the results."""
    # Roll 3 six-sided dice
    die1 = random.randint(1, 6)
    die2 = random.randint(1, 6)
    die3 = random.randint(1, 6)
    
    # Calculate total
    total = die1 + die2 + die3
    
    # Display results
    print("3d6 Dice Roll Results:")
    print(f"Die 1: {die1}")
    print(f"Die 2: {die2}")
    print(f"Die 3: {die3}")
    print(f"Total: {total}")


if __name__ == "__main__":
    main()
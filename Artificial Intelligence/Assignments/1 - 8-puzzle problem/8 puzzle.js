import random
from collections import deque
import time
import os

# Initial puzzle state
puzzle = [0, 1, 2, 3, 4, 5, 6, 7, 8]
directions = {
    "up": -3,
    "down": 3,
    "left": -1,
    "right": 1
}
empty_tile = 0  # Position of the empty tile

# Shuffle the puzzle
def shuffle():
    global puzzle, empty_tile
    for _ in range(100):
        random_direction = random.choice(list(directions.keys()))
        move_tile(random_direction)
    update_ui()

# Update UI (console representation) to reflect puzzle state
def update_ui():
    os.system('clear')  # Clear the console for better visualization (use 'cls' for Windows)
    for i in range(3):
        print(puzzle[i * 3:(i + 1) * 3])
    print()

# Move tile in the given direction
def move_tile(direction):
    global puzzle, empty_tile
    target_index = empty_tile + directions[direction]

    if is_valid_move(empty_tile, target_index, direction):
        puzzle[empty_tile], puzzle[target_index] = puzzle[target_index], puzzle[empty_tile]
        empty_tile = target_index

# Validate move based on boundaries and puzzle rules
def is_valid_move(empty_index, target_index, direction):
    if target_index < 0 or target_index > 8:
        return False
    if (empty_index % 3 == 0 and direction == "left") or (empty_index % 3 == 2 and direction == "right"):
        return False
    return True

# Solve the puzzle using BFS
def bfs_solve():
    visited = set()
    queue = deque([{"state": puzzle[:], "moves": []}])

    while queue:
        current = queue.popleft()
        state = current["state"]
        moves = current["moves"]

        if is_goal(state):
            animate_moves(moves)
            return

        visited.add(tuple(state))

        for direction in directions:
            new_state = move_state(state[:], direction)
            if new_state and tuple(new_state) not in visited:
                queue.append({"state": new_state, "moves": moves + [direction]})

# Move state for BFS
def move_state(state, direction):
    empty_index = state.index(0)
    target_index = empty_index + directions[direction]

    if is_valid_move_bfs(empty_index, target_index, direction):
        state[empty_index], state[target_index] = state[target_index], state[empty_index]
        return state
    return None

# Validate move for BFS
def is_valid_move_bfs(empty_index, target_index, direction):
    if target_index < 0 or target_index > 8:
        return False
    if (empty_index % 3 == 0 and direction == "left") or (empty_index % 3 == 2 and direction == "right"):
        return False
    return True

# Check if current state matches the goal
def is_goal(state):
    return state == [0, 1, 2, 3, 4, 5, 6, 7, 8]

# Animate the solution moves
def animate_moves(moves):
    global puzzle, empty_tile
    for move in moves:
        move_tile(move)
        update_ui()
        time.sleep(0.5)

# Main
if __name__ == "__main__":
    print("Initial Puzzle:")
    update_ui()

    print("Shuffling puzzle...")
    shuffle()
    update_ui()

    print("Solving puzzle using BFS...")
    bfs_solve()

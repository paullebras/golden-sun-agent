import random

# Define the possible GBA inputs
gba_inputs = ["A", "B", "L", "R", "Select", "Start"]
movement_inputs = ["Up", "Down", "Left", "Right"]

# Define the number of random inputs to generate
num_inputs = 100

# Probability of generating a movement key
movement_probability = 1

# Function to generate a random duration
def generate_duration(input_action):
    if input_action in movement_inputs:
        return random.randint(100, 1000)  # Random duration between 100 and 1000 frames
    else:
        return 1  # Duration of 1 frame for other inputs

# Generate random inputs with durations
random_inputs = []
for _ in range(num_inputs):
    if random.random() < movement_probability:
        input_action = random.choice(movement_inputs)
    else:
        input_action = random.choice(gba_inputs)
    duration = generate_duration(input_action)
    random_inputs.append((input_action, duration))

# Write the random inputs and durations to a file
input_file_path = "inputs.txt"
with open(input_file_path, "w") as file:
    for input_action, duration in random_inputs:
        file.write(f"{input_action},{duration}\n")

print(f"Generated {num_inputs} random inputs with durations and saved to {input_file_path}")

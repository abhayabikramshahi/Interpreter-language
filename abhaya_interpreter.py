# abhaya_interpreter.py
import sys

# Terminal styling
RESET = "\033[0m"
BOLD = "\033[1m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
CYAN = "\033[96m"
MAGENTA = "\033[95m"

def highlight(text, color=GREEN):
    return f"{color}{text}{RESET}"

def run_abhaya_code(file_path):
    try:
        with open(file_path, 'r', encoding="utf-8") as f:
            code = f.readlines()
    except FileNotFoundError:
        print(highlight("❌ File not found!", RED))
        return

    in_function = False
    function_lines = []

    for line in code:
        line = line.strip()
        if not line:
            continue  # Skip blank lines

        # Start of function
        if line.startswith("from bana") and "=>" in line and line.endswith("{"):
            in_function = True
            function_lines = []
            print(highlight("\n🔧 Starting function block...\n", CYAN))
            continue

        # End of function
        elif line == "};":
            in_function = False
            execute_function_block(function_lines)
            print(highlight("\n✅ End of function block\n", CYAN))
            continue

        # Collect lines inside function
        if in_function:
            function_lines.append(line)
            continue

        # Handle chapde() outside function
        if line.startswith("chapde(") and line.endswith(")"):
            content = line[7:-1]
            if content.startswith('"') and content.endswith('"'):
                print(highlight(" Output:", BOLD), content[1:-1] + "\n")
            else:
                print(highlight("❌ Error: chapde() needs double quotes\n", RED))
        else:
            print(highlight(" Unknown command: ", YELLOW), line + "\n")


def execute_function_block(lines):
    in_else_block = False

    for line in lines:
        line = line.strip()
        if not line:
            continue

        if line.startswith("garna parxa(") and line.endswith(")"):
            content = line[13:-1]
            if content.startswith('"') and content.endswith('"'):
                print(highlight(" Task:", BOLD), content[1:-1] + "\n")
            else:
                print(highlight("❌ Error in garna parxa(): needs double quotes\n", RED))

        elif line == "natra {":
            print(highlight(" natra block start", MAGENTA) + "\n")
            in_else_block = True

        elif line == "}":
            in_else_block = False

        elif line == "ghar ja":
            if in_else_block:
                print(highlight(" ghar ja (executing else block)", MAGENTA) + "\n")
            else:
                print(highlight(" ghar ja found outside natra block", YELLOW) + "\n")

        else:
            print(highlight(" Unknown line in function: ", YELLOW), line + "\n")


# Run the interpreter
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(highlight(" Usage: python abhaya_interpreter.py <filename>.abhaya", CYAN))
    else:
        run_abhaya_code(sys.argv[1])

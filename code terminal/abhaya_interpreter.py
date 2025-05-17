import sys
import time

RESET = "\033[0m"
BOLD = "\033[1m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
CYAN = "\033[96m"
MAGENTA = "\033[95m"

def highlight(text, color=GREEN):
    return f"{color}{text}{RESET}"

variables = {
    "fruits": ["aap", "mango", "banana", "lichi"],
    "rukha": lambda seconds: time.sleep(seconds)
}

functions = {}

def run_abhaya_code(file_path):
    try:
        with open(file_path, 'r', encoding="utf-8") as f:
            code = f.readlines()
    except FileNotFoundError:
        print(highlight("File not found!", RED))
        return

    i = 0
    while i < len(code):
        line = code[i].strip()
        if not line or line.startswith("//"):
            i += 1
            continue

        if line.startswith("karan gar") or line.startswith("karan-gar"):
            try:
                prefix = "karan gar" if line.startswith("karan gar") else "karan-gar"
                name_val = line[len(prefix):].strip().strip(";")
                name, val = name_val.split("=")
                name = name.strip()
                val = eval(val.strip(), {}, variables)
                variables[name] = val
            except:
                print(highlight(f"Syntax error in {prefix}", RED))
                
        elif line.startswith("samman gar"):
            try:
                name_val = line[11:].strip().strip(";")
                if "=>" in name_val:  # Arrow function
                    name, func_body = name_val.split("=")
                    name = name.strip()
                    # Parse arrow function
                    params_part, body_part = func_body.strip().split("=>")
                    params = params_part.strip().strip("()").split(",")
                    params = [p.strip() for p in params]
                    body = body_part.strip()
                    
                    # Store the arrow function
                    functions[name] = {
                        "type": "arrow",
                        "params": params,
                        "body": body
                    }
                    variables[name] = f"[Function: {name}]"
                else:  # Regular variable
                    name, val = name_val.split("=")
                    name = name.strip()
                    val_str = val.strip()
                    
                    # Handle object literals with proper parsing
                    if val_str.startswith("{") and val_str.endswith("}"):
                        # Parse object literal
                        obj_content = val_str[1:-1].strip()
                        obj = {}
                        
                        if obj_content:
                            # Split by commas, but handle nested structures
                            parts = []
                            current = ""
                            brace_count = 0
                            
                            for char in obj_content:
                                if char == "{":
                                    brace_count += 1
                                    current += char
                                elif char == "}":
                                    brace_count -= 1
                                    current += char
                                elif char == "," and brace_count == 0:
                                    parts.append(current.strip())
                                    current = ""
                                else:
                                    current += char
                                    
                            if current:
                                parts.append(current.strip())
                                
                            # Process each key-value pair
                            for part in parts:
                                if ":" in part:
                                    key, value = part.split(":", 1)
                                    key = key.strip().strip('"').strip("'")
                                    value = value.strip()
                                    
                                    # Evaluate the value
                                    try:
                                        obj[key] = eval(value, {}, variables)
                                    except:
                                        obj[key] = value
                        
                        variables[name] = obj
                    else:
                        # Regular value evaluation
                        val = eval(val_str, {}, variables)
                        variables[name] = val
            except Exception as e:
                print(highlight(f"Syntax error in samman gar: {e}", RED))

        elif line.startswith("yedi") and line.endswith("{"):
            condition_result = eval_condition(line)
            block_lines, offset = extract_block(code, i + 1)
            i += offset
            if condition_result:
                run_block(block_lines)
                # Skip remaining tara or tara yedi
                while i < len(code):
                    next_line = code[i].strip()
                    if next_line.startswith("tara"):
                        i += 1
                        if next_line.endswith("{"):
                            _, skip_offset = extract_block(code, i)
                            i += skip_offset
                    else:
                        break
                continue

        elif line.startswith("tara yedi") and line.endswith("{"):
            condition_result = eval_condition(line.replace("tara ", ""))
            block_lines, offset = extract_block(code, i + 1)
            i += offset
            if condition_result:
                run_block(block_lines)
                # Skip rest
                while i < len(code):
                    next_line = code[i].strip()
                    if next_line.startswith("tara"):
                        i += 1
                        if next_line.endswith("{"):
                            _, skip_offset = extract_block(code, i)
                            i += skip_offset
                    else:
                        break
                continue

        elif line.startswith("tara") and line.endswith("{"):
            block_lines, offset = extract_block(code, i + 1)
            i += offset
            run_block(block_lines)
            
        elif line.startswith("karan gar {") or line.startswith("karan-gar {"):
            # Object destructuring
            try:
                prefix = "karan gar" if line.startswith("karan gar") else "karan-gar"
                dest_expr = line[len(prefix):].strip().strip(";") 
                if "=" in dest_expr:
                    dest_part, obj_name = dest_expr.split("=")
                    dest_part = dest_part.strip().strip("{}").strip()
                    obj_name = obj_name.strip()
                    
                    if obj_name in variables and isinstance(variables[obj_name], dict):
                        # Extract properties
                        props = [p.strip() for p in dest_part.split(",")]
                        for prop in props:
                            if prop in variables[obj_name]:
                                variables[prop] = variables[obj_name][prop]
                            else:
                                variables[prop] = None
            except Exception as e:
                print(highlight(f"Error in object destructuring: {e}", RED))

        elif line.startswith("karya ho ") and line.endswith("{"):
            # Function declaration
            try:
                func_decl = line[9:line.find("{")].strip()
                func_name = func_decl[:func_decl.find("(")].strip()
                params_str = func_decl[func_decl.find("(")+1:func_decl.find(")")].strip()
                params = [p.strip() for p in params_str.split(",") if p.strip()]
                
                # Extract function body
                block_lines, offset = extract_block(code, i + 1)
                i += offset
                
                # Store the function
                functions[func_name] = {
                    "type": "regular",
                    "params": params,
                    "body": block_lines
                }
                variables[func_name] = f"[Function: {func_name}]"
                continue
            except Exception as e:
                print(highlight(f"Syntax error in function declaration: {e}", RED))
                
        elif line.startswith("tesko-lagi ") and line.endswith("{"):
            # For loop implementation
            try:
                loop_expr = line[11:line.find("{")].strip()
                loop_parts = loop_expr.strip("()").split(";") 
                if len(loop_parts) == 3:  # C-style for loop
                    init_expr, condition, increment = loop_parts
                    
                    # Initialize loop variable
                    if "=" in init_expr:
                        var_name, var_val = init_expr.split("=")
                        var_name = var_name.replace("dekha ", "").strip()
                        variables[var_name] = eval(var_val.strip(), {}, variables)
                    
                    # Extract loop body
                    block_lines, offset = extract_block(code, i + 1)
                    i += offset
                    
                    # Execute loop
                    while eval(condition, {}, variables):
                        run_block(block_lines)
                        # Execute increment
                        exec(increment, {}, variables)
                    
                    continue
            except Exception as e:
                print(highlight(f"Syntax error in for loop: {e}", RED))
                
        elif line.startswith("tesko-ma ") and line.endswith("{"):
            # For-in loop implementation (for object properties)
            try:
                loop_expr = line[9:line.find("{")].strip()
                loop_expr = loop_expr.strip("()")
                
                if "in" in loop_expr:
                    var_part, obj_part = loop_expr.split("in")
                    var_name = var_part.replace("dekha ", "").strip()
                    obj_name = obj_part.strip()
                    
                    if obj_name in variables and isinstance(variables[obj_name], dict):
                        # Extract loop body
                        block_lines, offset = extract_block(code, i + 1)
                        i += offset
                        
                        # Execute loop for each property
                        for prop in variables[obj_name]:
                            variables[var_name] = prop
                            run_block(block_lines)
                        
                        continue
                    else:
                        print(highlight(f"Object {obj_name} not found or not an object", RED))
            except Exception as e:
                print(highlight(f"Syntax error in for-in loop: {e}", RED))
                
        elif line.startswith("tesko-bata ") and line.endswith("{"):
            # For-of loop implementation (for array elements)
            try:
                loop_expr = line[11:line.find("{")].strip()
                loop_expr = loop_expr.strip("()")
                
                if "of" in loop_expr:
                    var_part, arr_part = loop_expr.split("of")
                    var_name = var_part.replace("dekha ", "").strip()
                    arr_name = arr_part.strip()
                    
                    if arr_name in variables and isinstance(variables[arr_name], list):
                        # Extract loop body
                        block_lines, offset = extract_block(code, i + 1)
                        i += offset
                        
                        # Execute loop for each element
                        for item in variables[arr_name]:
                            variables[var_name] = item
                            run_block(block_lines)
                        
                        continue
                    else:
                        print(highlight(f"Array {arr_name} not found or not an array", RED))
            except Exception as e:
                print(highlight(f"Syntax error in for-of loop: {e}", RED))
                
        elif line.startswith("jaba-samma ") and line.endswith("{"):
            # While loop implementation
            try:
                condition = line[11:line.find("{")].strip()
                condition = condition.strip("()")
                
                # Extract loop body
                block_lines, offset = extract_block(code, i + 1)
                i += offset
                
                # Execute loop
                while eval(condition, {}, variables):
                    run_block(block_lines)
                
                continue
            except Exception as e:
                print(highlight(f"Syntax error in while loop: {e}", RED))
                
        elif line.startswith("chapde(") and line.endswith(");"):
            expr = line[7:-2]
            output = parse_expression(expr)
            if output is not None:
                print(output)
            else:
                print(highlight("Error in chapde()", RED))
                
        elif line.startswith("rukha(") and line.endswith(");"):
            # Sleep/delay function implementation
            try:
                seconds_expr = line[6:-2]
                seconds = eval(seconds_expr, {}, variables)
                if isinstance(seconds, (int, float)):
                    time.sleep(seconds)
                else:
                    print(highlight("rukha() requires a number in seconds", RED))
            except Exception as e:
                print(highlight(f"Error in rukha(): {e}", RED))
                
        elif line.startswith("bhanna-laga "):
            # Object creation
            try:
                obj_expr = line[12:].strip().strip(";")
                if "=" in obj_expr:
                    name, obj_literal = obj_expr.split("=", 1)
                    name = name.strip()
                    obj_literal = obj_literal.strip()
                    
                    # Parse the object literal
                    obj = parse_expression(obj_literal)
                    if isinstance(obj, dict):
                        variables[name] = obj
                    else:
                        print(highlight("Invalid object literal", RED))
            except Exception as e:
                print(highlight(f"Error in object creation: {e}", RED))
                
        elif "." in line and "(" in line and ");" in line and not line.startswith("//"):
            # Method call on object
            try:
                dot_pos = line.find(".")
                obj_name = line[:dot_pos].strip()
                method_call = line[dot_pos+1:].strip()
                method_name = method_call[:method_call.find("(")].strip()
                args_str = method_call[method_call.find("(")+1:method_call.find(");")].strip()
                
                if obj_name in variables:
                    obj = variables[obj_name]
                    
                    # Handle array methods
                    if isinstance(obj, list):
                        if method_name.lower() == "tesko-lagieach" or method_name.lower() == "foreach" or method_name.lower() == "hereko":
                            # Parse callback function
                            if "=>" in args_str:
                                param, body = args_str.split("=>", 1)
                                param = param.strip().strip("()").strip()
                                body = body.strip()
                                
                                # Execute forEach
                                for item in obj:
                                    # Create temporary scope
                                    temp_vars = variables.copy()
                                    variables[param] = item
                                    
                                    # Execute callback body
                                    if body.startswith("chapde(") and body.endswith(")"):
                                        expr = body[7:-1]
                                        output = parse_expression(expr)
                                        if output is not None:
                                            print(output)
                                    else:
                                        try:
                                            eval(body, {}, variables)
                                        except Exception as e:
                                            print(highlight(f"Error in forEach callback: {e}", RED))
                                    
                                    # Restore scope
                                    variables.clear()
                                    variables.update(temp_vars)
                            else:
                                print(highlight("Invalid forEach callback", RED))
                        else:
                            print(highlight(f"Unknown array method: {method_name}", RED))
                    else:
                        print(highlight(f"Cannot call method on non-object: {obj_name}", RED))
                else:
                    print(highlight(f"Object not found: {obj_name}", RED))
            except Exception as e:
                print(highlight(f"Error in method call: {e}", RED))
                
        elif "(" in line and ");" in line and not line.startswith("//"):
            # Function call
            try:
                func_name = line[:line.find("(")].strip()
                if func_name in functions:
                    args_str = line[line.find("(")+1:line.find(");")].strip()
                    args = [eval(arg.strip(), {}, variables) for arg in args_str.split(",") if arg.strip()]
                    
                    # Execute function
                    result = execute_function(func_name, args)
                    if result is not None:
                        print(result)
                else:
                    print(highlight(f"Function {func_name} not found", RED))
            except Exception as e:
                print(highlight(f"Error in function call: {e}", RED))

        else:
            print(highlight("Unknown command: ", YELLOW), line)

        i += 1

def eval_condition(line):
    try:
        condition = line[line.find("(")+1:line.find(")")]
        return eval(condition, {}, variables)
    except:
        print(highlight("Syntax error in yedi condition", RED))
        return False

def extract_block(code, start_index):
    block_lines = []
    count = 0
    for i in range(start_index, len(code)):
        line = code[i].strip()
        if line == "}":
            return block_lines, (i - start_index + 1)
        block_lines.append(line)
    print(highlight("Missing closing }", RED))
    return block_lines, len(code) - start_index

def run_block(lines):
    for line in lines:
        if not line or line.startswith("//"):
            # Skip empty lines and comments
            continue
        elif line.startswith("chapde(") and line.endswith(");"):
            expr = line[7:-2]
            output = parse_expression(expr)
            if output is not None:
                print(output)
            else:
                print(highlight("Error in chapde()", RED))
        elif line.startswith("rukha(") and line.endswith(");"):
            # Sleep/delay function implementation in blocks
            try:
                seconds_expr = line[6:-2]
                seconds = eval(seconds_expr, {}, variables)
                if isinstance(seconds, (int, float)):
                    time.sleep(seconds)
                else:
                    print(highlight("rukha() requires a number in seconds", RED))
            except Exception as e:
                print(highlight(f"Error in rukha(): {e}", RED))
        elif line.startswith("niske "):
            # Return statement
            expr = line[6:].strip().strip(";") 
            return parse_expression(expr)
        elif "=" in line and line.endswith(";") and not "==" in line and not line.startswith("//"):
            # Variable assignment within block
            try:
                name_val = line.strip().strip(";")
                name, val = name_val.split("=", 1)
                name = name.strip()
                val_str = val.strip()
                
                # Evaluate the value
                val = eval(val_str, {}, variables)
                variables[name] = val
            except Exception as e:
                print(highlight(f"Error in assignment: {e}", RED))
        elif "(" in line and ");" in line and not line.startswith("//"):
            # Function call within block
            try:
                func_name = line[:line.find("(")].strip()
                if func_name in functions:
                    args_str = line[line.find("(")+1:line.find(");")].strip()
                    args = [eval(arg.strip(), {}, variables) for arg in args_str.split(",") if arg.strip()]
                    
                    # Execute function
                    result = execute_function(func_name, args)
                    if result is not None:
                        print(result)
                else:
                    print(highlight(f"Function {func_name} not found", RED))
            except Exception as e:
                print(highlight(f"Error in function call: {e}", RED))
        else:
            print(highlight("Invalid syntax in block: ", YELLOW), line)
    return None

def execute_function(func_name, args):
    if func_name not in functions:
        print(highlight(f"Function {func_name} not found", RED))
        return None
        
    func = functions[func_name]
    
    # Create local scope for function
    local_vars = {}
    
    # Bind arguments to parameters
    for i, param in enumerate(func["params"]):
        if i < len(args):
            local_vars[param] = args[i]
    
    # Save global variables
    global_vars = variables.copy()
    
    # Add local variables to global scope (for simplicity)
    variables.update(local_vars)
    
    result = None
    if func["type"] == "regular":
        # Execute function body
        result = run_block(func["body"])
    elif func["type"] == "arrow":
        # Execute arrow function
        body = func["body"]
        if body.startswith("`") and body.endswith("`"):  # Template literal
            # Simple template literal evaluation
            result = body[1:-1]
            # Replace ${var} with variable values
            import re
            for var_match in re.finditer(r"\${([^}]+)}", result):
                var_name = var_match.group(1)
                if var_name in variables:
                    result = result.replace(f"${{{var_name}}}", str(variables[var_name]))
        else:
            # Simple expression evaluation
            result = eval(body, {}, variables)
    
    # Restore global variables
    variables.clear()
    variables.update(global_vars)
    
    return result

def parse_expression(expr):
    expr = expr.strip()
    
    # Handle array indexing and object property access
    if '[' in expr and ']' in expr:
        try:
            obj_name = expr[:expr.find('[')].strip()
            key_expr = expr[expr.find('[')+1:expr.find(']')].strip()
            
            if obj_name in variables:
                if isinstance(variables[obj_name], list):
                    # Array indexing
                    index = int(eval(key_expr, {}, variables))
                    if 0 <= index < len(variables[obj_name]):
                        return variables[obj_name][index]
                    else:
                        print(highlight("Array index out of bounds", RED))
                        return "[Invalid Index]"
                elif isinstance(variables[obj_name], dict):
                    # Object property access
                    key = eval(key_expr, {}, variables)
                    if key in variables[obj_name]:
                        return variables[obj_name][key]
                    else:
                        print(highlight(f"Property {key} not found in object", RED))
                        return None
        except Exception as e:
            print(highlight(f"Error in indexing: {e}", RED))
            return "[Invalid Index]"
    
    # Handle object literals { key: value }
    if expr.startswith('{') and expr.endswith('}'): 
        try:
            # Simple object parser
            obj_content = expr[1:-1].strip()
            if not obj_content:
                return {}
                
            properties = []
            current = ""
            in_string = False
            string_char = None
            
            # Split by commas, but respect strings
            for char in obj_content:
                if char in ['"', "'"] and (not in_string or string_char == char):
                    in_string = not in_string
                    if in_string:
                        string_char = char
                    else:
                        string_char = None
                    current += char
                elif char == ',' and not in_string:
                    properties.append(current.strip())
                    current = ""
                else:
                    current += char
                    
            if current.strip():
                properties.append(current.strip())
                
            # Parse each property
            obj = {}
            for prop in properties:
                if ':' in prop:
                    key, value = prop.split(':', 1)
                    key = key.strip().strip('"\'')
                    value = value.strip()
                    
                    # Evaluate the value
                    if value.startswith('"') and value.endswith('"'):
                        obj[key] = value[1:-1]  # String
                    elif value.lower() == 'true':
                        obj[key] = True
                    elif value.lower() == 'false':
                        obj[key] = False
                    elif value.lower() == 'null':
                        obj[key] = None
                    elif value in variables:
                        obj[key] = variables[value]
                    else:
                        try:
                            obj[key] = eval(value, {}, variables)
                        except:
                            obj[key] = value
            return obj
        except Exception as e:
            print(highlight(f"Error parsing object: {e}", RED))
            return {}
    
    # Handle addition
    if "+" in expr:
        parts = [p.strip() for p in expr.split("+")]
        final = ""
        for p in parts:
            final += str(parse_expression(p) or "")
        return final
        
    # Handle string literals
    if expr.startswith('"') and expr.endswith('"'):
        return expr[1:-1]
        
    # Handle object property access with dot notation
    if "." in expr:
        parts = expr.split(".")
        var = parts[0]
        if var in variables:
            current = variables[var]
            for key in parts[1:]:
                if isinstance(current, dict) and key in current:
                    current = current[key]
                else:
                    return f"[Missing {key}]"
            return current
            
    # Handle array access
    if "[" in expr and "]" in expr:
        var, index = expr.split("[", 1)
        index = index.replace("]", "")
        if var in variables:
            try:
                return variables[var][int(index)]
            except:
                return "[Invalid Index]"
                
    # Handle null coalescing operator ??
    if "??" in expr:
        left, right = expr.split("??", 1)
        left = left.strip()
        right = right.strip()
        
        # Handle optional chaining
        if "?." in left:
            parts = left.split("?.")
            var = parts[0]
            if var in variables:
                if variables[var] is None:
                    return parse_expression(right)
                    
                current = variables[var]
                for key in parts[1:]:
                    if isinstance(current, dict) and key in current:
                        current = current[key]
                    else:
                        return parse_expression(right)
                return current
            return parse_expression(right)
        
        # Regular null coalescing
        left_val = parse_expression(left)
        if left_val is None:
            return parse_expression(right)
        return left_val
        
    # Handle variable references
    if expr in variables:
        return variables[expr]
        
    # Try to evaluate as a literal or expression
    try:
        return eval(expr, {}, variables)
    except:
        return None

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(highlight("Usage: python abhaya_interpreter.py <filename>.abhaya", CYAN))
    else:
        run_abhaya_code(sys.argv[1])

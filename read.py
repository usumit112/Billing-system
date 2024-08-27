def load_land_data(file_name):
    """
    Reads land data from a text file and returns it as a list of dictionaries.
    
    :param file_name: The name of the file to read from
    :return: List of dictionaries containing land data
    """
    lands = []
    try:
        with open(file_name, "r") as file:
            header = file.readline().strip()  # Read and ignore header
            for line in file:
                # Remove any extra spaces around commas and split
                parts = [part.strip() for part in line.strip().split(",")]
                if len(parts) != 6:
                    print(f"Error processing line: {line.strip()}. Expected 6 values, got {len(parts)}.")
                    continue
                try:
                    kitta_number, city, direction, area, price, status = parts
                    lands.append({
                        "kitta_number": kitta_number,
                        "city": city,
                        "direction": direction,
                        "area": area,
                        "price": int(price),
                        "status": status
                    })
                except ValueError as e:
                    print(f"Error processing line: {line.strip()}. Error: {e}")
    except FileNotFoundError:
        print(f"Error: {file_name} not found.")
    return lands

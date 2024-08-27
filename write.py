def update_land_data(file_name, lands):
    """
    Writes the updated land data back to the text file.
    
    :param file_name: The name of the file to write to
    :param lands: List of dictionaries containing updated land data
    """
    try:
        with open(file_name, "w") as file:
            for land in lands:
                line = (f'{land["kitta_number"]}, '
                        f'{land["city"]}, '
                        f'{land["direction"]}, '
                        f'{land["area"]}, '
                        f'{land["price"]}, '
                        f'{land["status"]}\n')
                file.write(line)
    except IOError as e:
        print(f"Error writing to file: {file_name}. Error: {e}")

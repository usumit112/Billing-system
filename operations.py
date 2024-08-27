import datetime

def display_available_lands(lands):
    """
    Displays all available lands.
    
    :param lands: List of dictionaries containing land data
    """
    for land in lands:
        if land["status"] == "Available":
            print(land)

def rent_land(lands, kitta_numbers, rent_months):
    """
    Rents out lands and updates their status.
    
    :param lands: List of dictionaries containing land data
    :param kitta_numbers: List of kitta numbers to be rented
    :param rent_months: Number of months the land is being rented for
    :return: List of rented lands
    """
    rented_lands = []
    for land in lands:
        if land["kitta_number"] in kitta_numbers and land["status"] == "Available":
            land["status"] = "Unavailable"
            land["rent_months"] = rent_months
            land["rented_date"] = datetime.datetime.now()
            rented_lands.append(land)
        elif land["kitta_number"] in kitta_numbers and land["status"] != "Available":
            print(f"Land with kitta number {land['kitta_number']} is not available.")
    
    if not rented_lands:
        print("No lands were rented. Please check the kitta numbers or their availability.")
    return rented_lands

def return_land(lands, kitta_numbers):
    """
    Returns rented lands and calculates any fines if applicable.
    
    :param lands: List of dictionaries containing land data
    :param kitta_numbers: List of kitta numbers to be returned
    :return: List of returned lands with fine calculations
    """
    returned_lands = []
    for land in lands:
        if land["kitta_number"] in kitta_numbers and land["status"] == "Unavailable":
            rent_months = land.get("rent_months", 0)
            rented_date = land.get("rented_date", datetime.datetime.now())
            return_date = datetime.datetime.now()
            total_months = (return_date.year - rented_date.year) * 12 + return_date.month - rented_date.month
            price = land["price"] * total_months
            
            fine = 0
            if total_months > rent_months:
                fine = 0.1 * land["price"] * (total_months - rent_months)
            
            land["status"] = "Available"
            land.pop("rent_months", None)
            land.pop("rented_date", None)
            
            land["total_price"] = price
            land["fine"] = fine
            land["total_amount"] = price + fine
            returned_lands.append(land)
    return returned_lands

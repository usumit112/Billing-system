from read import load_land_data
from write import update_land_data
from operations import display_available_lands, rent_land, return_land

def display_menu():
    """
    Displays the main menu and gets the user's choice.
    
    :return: User's choice as a string
    """
    print("\nMenu:")
    print("1. Display Available Lands")
    print("2. Rent Land")
    print("3. Return Land")
    print("4. Exit")
    return input("Choose an option: ")

def print_bill(land, total_amount, fine=0):
    """
    Prints the bill details for rented or returned lands.
    
    :param land: Dictionary containing land details
    :param total_amount: Total amount to be paid
    :param fine: Fine amount if applicable
    """
    print("\n--- Bill Details ---")
    print(f"Kitta Number: {land['kitta_number']}")
    print(f"City: {land['city']}")
    print(f"Direction: {land['direction']}")
    print(f"Area: {land['area']}")
    print(f"Price per Month: {land['price']}")
    print(f"Total Amount: {total_amount}")
    if fine > 0:
        print(f"Fine: {fine}")
    print(f"Total Amount Due: {total_amount + fine}")
    print("---------------------\n")

def main():
    file_path = r'C:\Users\sumit\Desktop\22067569 sumit pandit\lands.txt'
    lands = load_land_data(file_path)
    
    if not lands:
        print("No land data loaded. Exiting program.")
        return
    
    while True:
        option = display_menu()
        
        if option == "1":
            display_available_lands(lands)
        
        elif option == "2":
            try:
                kitta_numbers = [kitta.strip() for kitta in input("Enter the kitta numbers to rent (comma separated): ").split(",")]
                rent_months = int(input("Enter the number of months to rent: "))
                rented_lands = rent_land(lands, kitta_numbers, rent_months)
                
                if rented_lands:
                    for land in rented_lands:
                        total_amount = land["price"] * rent_months
                        print_bill(land, total_amount)
                
                update_land_data(file_path, lands)
            
            except ValueError:
                print("Invalid input. Please enter a number for the rental period.")
        
        elif option == "3":
            kitta_numbers = [kitta.strip() for kitta in input("Enter the kitta numbers to return (comma separated): ").split(",")]
            returned_lands = return_land(lands, kitta_numbers)
            
            if returned_lands:
                for land in returned_lands:
                    total_amount = land.get("total_amount", 0)
                    fine = land.get("fine", 0)
                    print_bill(land, total_amount, fine)
            
            update_land_data(file_path, lands)
        
        elif option == "4":
            print("Exiting the program.")
            break
        
        else:
            print("Invalid option. Please try again.")

if __name__ == "__main__":
    main()

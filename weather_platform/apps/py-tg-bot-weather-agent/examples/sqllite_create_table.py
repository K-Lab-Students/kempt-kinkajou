import sqlite3

# Connect to the SQLite database (creates the file if it doesn't exist)
conn = sqlite3.connect("events.db")

# Create a cursor object to execute SQL commands
cursor = conn.cursor()

# Define the SQL command to create the "events" table
create_table_query = """
CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    location TEXT
);
"""

# Execute the SQL command to create the table
cursor.execute(create_table_query)

# Commit the changes and close the connection
conn.commit()
conn.close()

print("Database created with the 'events' table.")

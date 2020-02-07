## Usage

1. Go to the label's Discogs page and get the id. It's the number in the URL after `/label/`, e.g. `https://www.discogs.com/label/654104-Fluid-Recordings-UK` -> `654104`

2. Run the following command:

    ```
        ts-node src/index $id 
    ```
    where `$id` is the label id, e.g. `ts-node src/index 654104` 

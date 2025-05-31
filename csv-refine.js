import csv from 'csvtojson'

function dateFormatCorrection(dateFields) {
    return (item) => {
        if (!dateFields || dateFields.length === 0) {
            console.warn('No date fields specified for correction. Skipping date format correction.')
            return item
        }
        // Iterate over each specified date field
        for (const dateField of dateFields) {
            if (item.hasOwnProperty(dateField)) {
                item[dateField] = formatDate(item, dateField)
            } else {
                console.warn(`Date field "${dateField}" not found in item. Skipping correction for this field.`)
            }
        }
        return item
    }
}

function formatDate(item, dateField) {
    if (item[dateField]) {
        // Convert date using the built-in Date util
        const date = new Date(item[dateField])
        if (!isNaN(date)) {
            // Force ISO format for consistency
            return date.toISOString().split('T').shift() // Format as 'YYYY-MM-DD'
        } else {
            console.warn(`Invalid date format for field "${dateField}":`, item[dateField])
            return item[dateField] // Return original value if date is invalid
        }
    }
    console.warn(`Date field "${dateField}" is missing in item.`)
    return null // Return null if the date field is not present
}

function parseArgsBoolean(args, option) {
    if (!args.includes(option)) {
        return {
            args
        }
    }
    return {
        args: args.filter(arg => arg !== option),
        value: true,
    }
}

function parseArgsInputs(args, option) {
    const values = []
    while (args.includes(option)) {
        const index = args.indexOf(option)
        if (index !== -1 && index + 1 < args.length) {
            values.push(...args[index + 1].split(',').map(e => e.trim())) // The next argument is the date field
            args.splice(index, 2) // Remove the option and its value
        } else {
            console.error(`No ${option} value specified.`)
            args.splice(index, 1) // Remove the option if no value is specified
            continue
        }
    }
    return {
        args,
        values
    }
}

async function main(...rawArgs) {

    // Check if any of the argument is '--reverse'
    const {
        args: preArgs,
        value: reverse
    } = parseArgsBoolean(rawArgs, '--reverse')
    // Check if any of the argument is '--date-field'
    const {
        args,
        values: dateFields
    } = parseArgsInputs(preArgs, '--date-fields')

    if (args.length < 1) {
        console.error('Please provide a file path as an argument.')
        return
    }

    const filePath = args.pop()
    console.log(rawArgs, preArgs, args, filePath, reverse, dateFields)
    const json = await csv().fromFile(filePath)
    return json
        .map(dateFormatCorrection(dateFields))
        .reverse()
}

main(...process.argv.slice(2))
    .then(data => console.log(data))
    .catch(err => {
        console.error('Error:', err)
        process.exit(1)
    })

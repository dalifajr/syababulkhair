import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AttendanceController::store
 * @see app/Http/Controllers/AttendanceController.php:61
 * @route '/assessments/{assignment}/attendance'
 */
export const store = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/assessments/{assignment}/attendance',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AttendanceController::store
 * @see app/Http/Controllers/AttendanceController.php:61
 * @route '/assessments/{assignment}/attendance'
 */
store.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assignment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: typeof args.assignment === 'object'
                ? args.assignment.id
                : args.assignment,
                }

    return store.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AttendanceController::store
 * @see app/Http/Controllers/AttendanceController.php:61
 * @route '/assessments/{assignment}/attendance'
 */
store.post = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AttendanceController::store
 * @see app/Http/Controllers/AttendanceController.php:61
 * @route '/assessments/{assignment}/attendance'
 */
    const storeForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AttendanceController::store
 * @see app/Http/Controllers/AttendanceController.php:61
 * @route '/assessments/{assignment}/attendance'
 */
        storeForm.post = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\AttendanceController::show
 * @see app/Http/Controllers/AttendanceController.php:107
 * @route '/assessments/{assignment}/attendance/{session}'
 */
export const show = (args: { assignment: number | { id: number }, session: number | { id: number } } | [assignment: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/assessments/{assignment}/attendance/{session}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AttendanceController::show
 * @see app/Http/Controllers/AttendanceController.php:107
 * @route '/assessments/{assignment}/attendance/{session}'
 */
show.url = (args: { assignment: number | { id: number }, session: number | { id: number } } | [assignment: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                    session: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: typeof args.assignment === 'object'
                ? args.assignment.id
                : args.assignment,
                                session: typeof args.session === 'object'
                ? args.session.id
                : args.session,
                }

    return show.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{session}', parsedArgs.session.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AttendanceController::show
 * @see app/Http/Controllers/AttendanceController.php:107
 * @route '/assessments/{assignment}/attendance/{session}'
 */
show.get = (args: { assignment: number | { id: number }, session: number | { id: number } } | [assignment: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AttendanceController::show
 * @see app/Http/Controllers/AttendanceController.php:107
 * @route '/assessments/{assignment}/attendance/{session}'
 */
show.head = (args: { assignment: number | { id: number }, session: number | { id: number } } | [assignment: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AttendanceController::show
 * @see app/Http/Controllers/AttendanceController.php:107
 * @route '/assessments/{assignment}/attendance/{session}'
 */
    const showForm = (args: { assignment: number | { id: number }, session: number | { id: number } } | [assignment: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AttendanceController::show
 * @see app/Http/Controllers/AttendanceController.php:107
 * @route '/assessments/{assignment}/attendance/{session}'
 */
        showForm.get = (args: { assignment: number | { id: number }, session: number | { id: number } } | [assignment: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AttendanceController::show
 * @see app/Http/Controllers/AttendanceController.php:107
 * @route '/assessments/{assignment}/attendance/{session}'
 */
        showForm.head = (args: { assignment: number | { id: number }, session: number | { id: number } } | [assignment: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\AttendanceController::update
 * @see app/Http/Controllers/AttendanceController.php:203
 * @route '/assessments/{assignment}/attendance/{session}'
 */
export const update = (args: { assignment: number | { id: number }, session: number | { id: number } } | [assignment: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/assessments/{assignment}/attendance/{session}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AttendanceController::update
 * @see app/Http/Controllers/AttendanceController.php:203
 * @route '/assessments/{assignment}/attendance/{session}'
 */
update.url = (args: { assignment: number | { id: number }, session: number | { id: number } } | [assignment: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                    session: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: typeof args.assignment === 'object'
                ? args.assignment.id
                : args.assignment,
                                session: typeof args.session === 'object'
                ? args.session.id
                : args.session,
                }

    return update.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{session}', parsedArgs.session.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AttendanceController::update
 * @see app/Http/Controllers/AttendanceController.php:203
 * @route '/assessments/{assignment}/attendance/{session}'
 */
update.post = (args: { assignment: number | { id: number }, session: number | { id: number } } | [assignment: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AttendanceController::update
 * @see app/Http/Controllers/AttendanceController.php:203
 * @route '/assessments/{assignment}/attendance/{session}'
 */
    const updateForm = (args: { assignment: number | { id: number }, session: number | { id: number } } | [assignment: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AttendanceController::update
 * @see app/Http/Controllers/AttendanceController.php:203
 * @route '/assessments/{assignment}/attendance/{session}'
 */
        updateForm.post = (args: { assignment: number | { id: number }, session: number | { id: number } } | [assignment: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
const attendance = {
    store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
}

export default attendance
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import students4fe9ea from './students'
import attendanceC12b95 from './attendance'
import scores2705a1 from './scores'
import items from './items'
/**
* @see \App\Http\Controllers\AssessmentController::index
 * @see app/Http/Controllers/AssessmentController.php:26
 * @route '/assessments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/assessments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssessmentController::index
 * @see app/Http/Controllers/AssessmentController.php:26
 * @route '/assessments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::index
 * @see app/Http/Controllers/AssessmentController.php:26
 * @route '/assessments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssessmentController::index
 * @see app/Http/Controllers/AssessmentController.php:26
 * @route '/assessments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssessmentController::index
 * @see app/Http/Controllers/AssessmentController.php:26
 * @route '/assessments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::index
 * @see app/Http/Controllers/AssessmentController.php:26
 * @route '/assessments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssessmentController::index
 * @see app/Http/Controllers/AssessmentController.php:26
 * @route '/assessments'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\AssessmentController::show
 * @see app/Http/Controllers/AssessmentController.php:52
 * @route '/assessments/{assignment}'
 */
export const show = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/assessments/{assignment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssessmentController::show
 * @see app/Http/Controllers/AssessmentController.php:52
 * @route '/assessments/{assignment}'
 */
show.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::show
 * @see app/Http/Controllers/AssessmentController.php:52
 * @route '/assessments/{assignment}'
 */
show.get = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssessmentController::show
 * @see app/Http/Controllers/AssessmentController.php:52
 * @route '/assessments/{assignment}'
 */
show.head = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssessmentController::show
 * @see app/Http/Controllers/AssessmentController.php:52
 * @route '/assessments/{assignment}'
 */
    const showForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::show
 * @see app/Http/Controllers/AssessmentController.php:52
 * @route '/assessments/{assignment}'
 */
        showForm.get = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssessmentController::show
 * @see app/Http/Controllers/AssessmentController.php:52
 * @route '/assessments/{assignment}'
 */
        showForm.head = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AssessmentController::students
 * @see app/Http/Controllers/AssessmentController.php:75
 * @route '/assessments/{assignment}/students'
 */
export const students = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: students.url(args, options),
    method: 'get',
})

students.definition = {
    methods: ["get","head"],
    url: '/assessments/{assignment}/students',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssessmentController::students
 * @see app/Http/Controllers/AssessmentController.php:75
 * @route '/assessments/{assignment}/students'
 */
students.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return students.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::students
 * @see app/Http/Controllers/AssessmentController.php:75
 * @route '/assessments/{assignment}/students'
 */
students.get = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: students.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssessmentController::students
 * @see app/Http/Controllers/AssessmentController.php:75
 * @route '/assessments/{assignment}/students'
 */
students.head = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: students.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssessmentController::students
 * @see app/Http/Controllers/AssessmentController.php:75
 * @route '/assessments/{assignment}/students'
 */
    const studentsForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: students.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::students
 * @see app/Http/Controllers/AssessmentController.php:75
 * @route '/assessments/{assignment}/students'
 */
        studentsForm.get = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: students.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssessmentController::students
 * @see app/Http/Controllers/AssessmentController.php:75
 * @route '/assessments/{assignment}/students'
 */
        studentsForm.head = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: students.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    students.form = studentsForm
/**
* @see \App\Http\Controllers\AssessmentController::tasks
 * @see app/Http/Controllers/AssessmentController.php:127
 * @route '/assessments/{assignment}/tasks'
 */
export const tasks = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tasks.url(args, options),
    method: 'get',
})

tasks.definition = {
    methods: ["get","head"],
    url: '/assessments/{assignment}/tasks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssessmentController::tasks
 * @see app/Http/Controllers/AssessmentController.php:127
 * @route '/assessments/{assignment}/tasks'
 */
tasks.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return tasks.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::tasks
 * @see app/Http/Controllers/AssessmentController.php:127
 * @route '/assessments/{assignment}/tasks'
 */
tasks.get = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tasks.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssessmentController::tasks
 * @see app/Http/Controllers/AssessmentController.php:127
 * @route '/assessments/{assignment}/tasks'
 */
tasks.head = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: tasks.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssessmentController::tasks
 * @see app/Http/Controllers/AssessmentController.php:127
 * @route '/assessments/{assignment}/tasks'
 */
    const tasksForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: tasks.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::tasks
 * @see app/Http/Controllers/AssessmentController.php:127
 * @route '/assessments/{assignment}/tasks'
 */
        tasksForm.get = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: tasks.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssessmentController::tasks
 * @see app/Http/Controllers/AssessmentController.php:127
 * @route '/assessments/{assignment}/tasks'
 */
        tasksForm.head = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: tasks.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    tasks.form = tasksForm
/**
* @see \App\Http\Controllers\AttendanceController::attendance
 * @see app/Http/Controllers/AttendanceController.php:28
 * @route '/assessments/{assignment}/attendance'
 */
export const attendance = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendance.url(args, options),
    method: 'get',
})

attendance.definition = {
    methods: ["get","head"],
    url: '/assessments/{assignment}/attendance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AttendanceController::attendance
 * @see app/Http/Controllers/AttendanceController.php:28
 * @route '/assessments/{assignment}/attendance'
 */
attendance.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return attendance.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AttendanceController::attendance
 * @see app/Http/Controllers/AttendanceController.php:28
 * @route '/assessments/{assignment}/attendance'
 */
attendance.get = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendance.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AttendanceController::attendance
 * @see app/Http/Controllers/AttendanceController.php:28
 * @route '/assessments/{assignment}/attendance'
 */
attendance.head = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: attendance.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AttendanceController::attendance
 * @see app/Http/Controllers/AttendanceController.php:28
 * @route '/assessments/{assignment}/attendance'
 */
    const attendanceForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: attendance.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AttendanceController::attendance
 * @see app/Http/Controllers/AttendanceController.php:28
 * @route '/assessments/{assignment}/attendance'
 */
        attendanceForm.get = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendance.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AttendanceController::attendance
 * @see app/Http/Controllers/AttendanceController.php:28
 * @route '/assessments/{assignment}/attendance'
 */
        attendanceForm.head = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendance.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    attendance.form = attendanceForm
/**
* @see \App\Http\Controllers\AssessmentController::create
 * @see app/Http/Controllers/AssessmentController.php:169
 * @route '/assessments/{assignment}/create'
 */
export const create = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/assessments/{assignment}/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssessmentController::create
 * @see app/Http/Controllers/AssessmentController.php:169
 * @route '/assessments/{assignment}/create'
 */
create.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::create
 * @see app/Http/Controllers/AssessmentController.php:169
 * @route '/assessments/{assignment}/create'
 */
create.get = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssessmentController::create
 * @see app/Http/Controllers/AssessmentController.php:169
 * @route '/assessments/{assignment}/create'
 */
create.head = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssessmentController::create
 * @see app/Http/Controllers/AssessmentController.php:169
 * @route '/assessments/{assignment}/create'
 */
    const createForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::create
 * @see app/Http/Controllers/AssessmentController.php:169
 * @route '/assessments/{assignment}/create'
 */
        createForm.get = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssessmentController::create
 * @see app/Http/Controllers/AssessmentController.php:169
 * @route '/assessments/{assignment}/create'
 */
        createForm.head = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\AssessmentController::store
 * @see app/Http/Controllers/AssessmentController.php:177
 * @route '/assessments/{assignment}'
 */
export const store = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/assessments/{assignment}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AssessmentController::store
 * @see app/Http/Controllers/AssessmentController.php:177
 * @route '/assessments/{assignment}'
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
* @see \App\Http\Controllers\AssessmentController::store
 * @see app/Http/Controllers/AssessmentController.php:177
 * @route '/assessments/{assignment}'
 */
store.post = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AssessmentController::store
 * @see app/Http/Controllers/AssessmentController.php:177
 * @route '/assessments/{assignment}'
 */
    const storeForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::store
 * @see app/Http/Controllers/AssessmentController.php:177
 * @route '/assessments/{assignment}'
 */
        storeForm.post = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\AssessmentController::scores
 * @see app/Http/Controllers/AssessmentController.php:198
 * @route '/assessments/scores/{assessment}'
 */
export const scores = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scores.url(args, options),
    method: 'get',
})

scores.definition = {
    methods: ["get","head"],
    url: '/assessments/scores/{assessment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssessmentController::scores
 * @see app/Http/Controllers/AssessmentController.php:198
 * @route '/assessments/scores/{assessment}'
 */
scores.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assessment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                }

    return scores.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::scores
 * @see app/Http/Controllers/AssessmentController.php:198
 * @route '/assessments/scores/{assessment}'
 */
scores.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scores.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssessmentController::scores
 * @see app/Http/Controllers/AssessmentController.php:198
 * @route '/assessments/scores/{assessment}'
 */
scores.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: scores.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssessmentController::scores
 * @see app/Http/Controllers/AssessmentController.php:198
 * @route '/assessments/scores/{assessment}'
 */
    const scoresForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: scores.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::scores
 * @see app/Http/Controllers/AssessmentController.php:198
 * @route '/assessments/scores/{assessment}'
 */
        scoresForm.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: scores.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssessmentController::scores
 * @see app/Http/Controllers/AssessmentController.php:198
 * @route '/assessments/scores/{assessment}'
 */
        scoresForm.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: scores.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    scores.form = scoresForm
const assessments = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
students: Object.assign(students, students4fe9ea),
tasks: Object.assign(tasks, tasks),
attendance: Object.assign(attendance, attendanceC12b95),
create: Object.assign(create, create),
store: Object.assign(store, store),
scores: Object.assign(scores, scores2705a1),
items: Object.assign(items, items),
}

export default assessments
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\AssessmentController::createAssessment
 * @see app/Http/Controllers/AssessmentController.php:169
 * @route '/assessments/{assignment}/create'
 */
export const createAssessment = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createAssessment.url(args, options),
    method: 'get',
})

createAssessment.definition = {
    methods: ["get","head"],
    url: '/assessments/{assignment}/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssessmentController::createAssessment
 * @see app/Http/Controllers/AssessmentController.php:169
 * @route '/assessments/{assignment}/create'
 */
createAssessment.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return createAssessment.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::createAssessment
 * @see app/Http/Controllers/AssessmentController.php:169
 * @route '/assessments/{assignment}/create'
 */
createAssessment.get = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createAssessment.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssessmentController::createAssessment
 * @see app/Http/Controllers/AssessmentController.php:169
 * @route '/assessments/{assignment}/create'
 */
createAssessment.head = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createAssessment.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssessmentController::createAssessment
 * @see app/Http/Controllers/AssessmentController.php:169
 * @route '/assessments/{assignment}/create'
 */
    const createAssessmentForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: createAssessment.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::createAssessment
 * @see app/Http/Controllers/AssessmentController.php:169
 * @route '/assessments/{assignment}/create'
 */
        createAssessmentForm.get = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createAssessment.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssessmentController::createAssessment
 * @see app/Http/Controllers/AssessmentController.php:169
 * @route '/assessments/{assignment}/create'
 */
        createAssessmentForm.head = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createAssessment.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    createAssessment.form = createAssessmentForm
/**
* @see \App\Http\Controllers\AssessmentController::storeAssessment
 * @see app/Http/Controllers/AssessmentController.php:177
 * @route '/assessments/{assignment}'
 */
export const storeAssessment = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeAssessment.url(args, options),
    method: 'post',
})

storeAssessment.definition = {
    methods: ["post"],
    url: '/assessments/{assignment}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AssessmentController::storeAssessment
 * @see app/Http/Controllers/AssessmentController.php:177
 * @route '/assessments/{assignment}'
 */
storeAssessment.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return storeAssessment.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::storeAssessment
 * @see app/Http/Controllers/AssessmentController.php:177
 * @route '/assessments/{assignment}'
 */
storeAssessment.post = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeAssessment.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AssessmentController::storeAssessment
 * @see app/Http/Controllers/AssessmentController.php:177
 * @route '/assessments/{assignment}'
 */
    const storeAssessmentForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeAssessment.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::storeAssessment
 * @see app/Http/Controllers/AssessmentController.php:177
 * @route '/assessments/{assignment}'
 */
        storeAssessmentForm.post = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeAssessment.url(args, options),
            method: 'post',
        })
    
    storeAssessment.form = storeAssessmentForm
/**
* @see \App\Http\Controllers\AssessmentController::addStudents
 * @see app/Http/Controllers/AssessmentController.php:143
 * @route '/assessments/{assignment}/students'
 */
export const addStudents = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addStudents.url(args, options),
    method: 'post',
})

addStudents.definition = {
    methods: ["post"],
    url: '/assessments/{assignment}/students',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AssessmentController::addStudents
 * @see app/Http/Controllers/AssessmentController.php:143
 * @route '/assessments/{assignment}/students'
 */
addStudents.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return addStudents.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::addStudents
 * @see app/Http/Controllers/AssessmentController.php:143
 * @route '/assessments/{assignment}/students'
 */
addStudents.post = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addStudents.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AssessmentController::addStudents
 * @see app/Http/Controllers/AssessmentController.php:143
 * @route '/assessments/{assignment}/students'
 */
    const addStudentsForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addStudents.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::addStudents
 * @see app/Http/Controllers/AssessmentController.php:143
 * @route '/assessments/{assignment}/students'
 */
        addStudentsForm.post = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addStudents.url(args, options),
            method: 'post',
        })
    
    addStudents.form = addStudentsForm
/**
* @see \App\Http\Controllers\AssessmentController::inputScores
 * @see app/Http/Controllers/AssessmentController.php:198
 * @route '/assessments/scores/{assessment}'
 */
export const inputScores = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inputScores.url(args, options),
    method: 'get',
})

inputScores.definition = {
    methods: ["get","head"],
    url: '/assessments/scores/{assessment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssessmentController::inputScores
 * @see app/Http/Controllers/AssessmentController.php:198
 * @route '/assessments/scores/{assessment}'
 */
inputScores.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return inputScores.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::inputScores
 * @see app/Http/Controllers/AssessmentController.php:198
 * @route '/assessments/scores/{assessment}'
 */
inputScores.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inputScores.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssessmentController::inputScores
 * @see app/Http/Controllers/AssessmentController.php:198
 * @route '/assessments/scores/{assessment}'
 */
inputScores.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: inputScores.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssessmentController::inputScores
 * @see app/Http/Controllers/AssessmentController.php:198
 * @route '/assessments/scores/{assessment}'
 */
    const inputScoresForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: inputScores.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::inputScores
 * @see app/Http/Controllers/AssessmentController.php:198
 * @route '/assessments/scores/{assessment}'
 */
        inputScoresForm.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: inputScores.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssessmentController::inputScores
 * @see app/Http/Controllers/AssessmentController.php:198
 * @route '/assessments/scores/{assessment}'
 */
        inputScoresForm.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: inputScores.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    inputScores.form = inputScoresForm
/**
* @see \App\Http\Controllers\AssessmentController::saveScores
 * @see app/Http/Controllers/AssessmentController.php:222
 * @route '/assessments/scores/{assessment}'
 */
export const saveScores = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveScores.url(args, options),
    method: 'post',
})

saveScores.definition = {
    methods: ["post"],
    url: '/assessments/scores/{assessment}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AssessmentController::saveScores
 * @see app/Http/Controllers/AssessmentController.php:222
 * @route '/assessments/scores/{assessment}'
 */
saveScores.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return saveScores.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::saveScores
 * @see app/Http/Controllers/AssessmentController.php:222
 * @route '/assessments/scores/{assessment}'
 */
saveScores.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveScores.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AssessmentController::saveScores
 * @see app/Http/Controllers/AssessmentController.php:222
 * @route '/assessments/scores/{assessment}'
 */
    const saveScoresForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: saveScores.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::saveScores
 * @see app/Http/Controllers/AssessmentController.php:222
 * @route '/assessments/scores/{assessment}'
 */
        saveScoresForm.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: saveScores.url(args, options),
            method: 'post',
        })
    
    saveScores.form = saveScoresForm
/**
* @see \App\Http\Controllers\AssessmentController::downloadScoresTemplate
 * @see app/Http/Controllers/AssessmentController.php:253
 * @route '/assessments/scores/{assessment}/template'
 */
export const downloadScoresTemplate = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadScoresTemplate.url(args, options),
    method: 'get',
})

downloadScoresTemplate.definition = {
    methods: ["get","head"],
    url: '/assessments/scores/{assessment}/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssessmentController::downloadScoresTemplate
 * @see app/Http/Controllers/AssessmentController.php:253
 * @route '/assessments/scores/{assessment}/template'
 */
downloadScoresTemplate.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return downloadScoresTemplate.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::downloadScoresTemplate
 * @see app/Http/Controllers/AssessmentController.php:253
 * @route '/assessments/scores/{assessment}/template'
 */
downloadScoresTemplate.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadScoresTemplate.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssessmentController::downloadScoresTemplate
 * @see app/Http/Controllers/AssessmentController.php:253
 * @route '/assessments/scores/{assessment}/template'
 */
downloadScoresTemplate.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadScoresTemplate.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssessmentController::downloadScoresTemplate
 * @see app/Http/Controllers/AssessmentController.php:253
 * @route '/assessments/scores/{assessment}/template'
 */
    const downloadScoresTemplateForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadScoresTemplate.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::downloadScoresTemplate
 * @see app/Http/Controllers/AssessmentController.php:253
 * @route '/assessments/scores/{assessment}/template'
 */
        downloadScoresTemplateForm.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadScoresTemplate.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssessmentController::downloadScoresTemplate
 * @see app/Http/Controllers/AssessmentController.php:253
 * @route '/assessments/scores/{assessment}/template'
 */
        downloadScoresTemplateForm.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadScoresTemplate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadScoresTemplate.form = downloadScoresTemplateForm
/**
* @see \App\Http\Controllers\AssessmentController::importScores
 * @see app/Http/Controllers/AssessmentController.php:266
 * @route '/assessments/scores/{assessment}/import'
 */
export const importScores = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importScores.url(args, options),
    method: 'post',
})

importScores.definition = {
    methods: ["post"],
    url: '/assessments/scores/{assessment}/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AssessmentController::importScores
 * @see app/Http/Controllers/AssessmentController.php:266
 * @route '/assessments/scores/{assessment}/import'
 */
importScores.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return importScores.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::importScores
 * @see app/Http/Controllers/AssessmentController.php:266
 * @route '/assessments/scores/{assessment}/import'
 */
importScores.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importScores.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AssessmentController::importScores
 * @see app/Http/Controllers/AssessmentController.php:266
 * @route '/assessments/scores/{assessment}/import'
 */
    const importScoresForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importScores.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::importScores
 * @see app/Http/Controllers/AssessmentController.php:266
 * @route '/assessments/scores/{assessment}/import'
 */
        importScoresForm.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importScores.url(args, options),
            method: 'post',
        })
    
    importScores.form = importScoresForm
/**
* @see \App\Http\Controllers\AssessmentController::destroyAssessment
 * @see app/Http/Controllers/AssessmentController.php:290
 * @route '/assessments/items/{assessment}'
 */
export const destroyAssessment = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyAssessment.url(args, options),
    method: 'delete',
})

destroyAssessment.definition = {
    methods: ["delete"],
    url: '/assessments/items/{assessment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AssessmentController::destroyAssessment
 * @see app/Http/Controllers/AssessmentController.php:290
 * @route '/assessments/items/{assessment}'
 */
destroyAssessment.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroyAssessment.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::destroyAssessment
 * @see app/Http/Controllers/AssessmentController.php:290
 * @route '/assessments/items/{assessment}'
 */
destroyAssessment.delete = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyAssessment.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AssessmentController::destroyAssessment
 * @see app/Http/Controllers/AssessmentController.php:290
 * @route '/assessments/items/{assessment}'
 */
    const destroyAssessmentForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyAssessment.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::destroyAssessment
 * @see app/Http/Controllers/AssessmentController.php:290
 * @route '/assessments/items/{assessment}'
 */
        destroyAssessmentForm.delete = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyAssessment.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyAssessment.form = destroyAssessmentForm
const AssessmentController = { index, show, students, tasks, createAssessment, storeAssessment, addStudents, inputScores, saveScores, downloadScoresTemplate, importScores, destroyAssessment }

export default AssessmentController
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ClassPromotionController::index
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:19
 * @route '/admin/class-promotions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/class-promotions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ClassPromotionController::index
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:19
 * @route '/admin/class-promotions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClassPromotionController::index
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:19
 * @route '/admin/class-promotions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ClassPromotionController::index
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:19
 * @route '/admin/class-promotions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ClassPromotionController::index
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:19
 * @route '/admin/class-promotions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ClassPromotionController::index
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:19
 * @route '/admin/class-promotions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ClassPromotionController::index
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:19
 * @route '/admin/class-promotions'
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
* @see \App\Http\Controllers\Admin\ClassPromotionController::show
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:58
 * @route '/admin/class-promotions/{classGroup}'
 */
export const show = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/class-promotions/{classGroup}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ClassPromotionController::show
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:58
 * @route '/admin/class-promotions/{classGroup}'
 */
show.url = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { classGroup: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { classGroup: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    classGroup: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        classGroup: typeof args.classGroup === 'object'
                ? args.classGroup.id
                : args.classGroup,
                }

    return show.definition.url
            .replace('{classGroup}', parsedArgs.classGroup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClassPromotionController::show
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:58
 * @route '/admin/class-promotions/{classGroup}'
 */
show.get = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ClassPromotionController::show
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:58
 * @route '/admin/class-promotions/{classGroup}'
 */
show.head = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ClassPromotionController::show
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:58
 * @route '/admin/class-promotions/{classGroup}'
 */
    const showForm = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ClassPromotionController::show
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:58
 * @route '/admin/class-promotions/{classGroup}'
 */
        showForm.get = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ClassPromotionController::show
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:58
 * @route '/admin/class-promotions/{classGroup}'
 */
        showForm.head = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ClassPromotionController::process
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:92
 * @route '/admin/class-promotions/{classGroup}/process'
 */
export const process = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: process.url(args, options),
    method: 'post',
})

process.definition = {
    methods: ["post"],
    url: '/admin/class-promotions/{classGroup}/process',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ClassPromotionController::process
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:92
 * @route '/admin/class-promotions/{classGroup}/process'
 */
process.url = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { classGroup: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { classGroup: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    classGroup: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        classGroup: typeof args.classGroup === 'object'
                ? args.classGroup.id
                : args.classGroup,
                }

    return process.definition.url
            .replace('{classGroup}', parsedArgs.classGroup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClassPromotionController::process
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:92
 * @route '/admin/class-promotions/{classGroup}/process'
 */
process.post = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: process.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ClassPromotionController::process
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:92
 * @route '/admin/class-promotions/{classGroup}/process'
 */
    const processForm = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: process.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ClassPromotionController::process
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:92
 * @route '/admin/class-promotions/{classGroup}/process'
 */
        processForm.post = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: process.url(args, options),
            method: 'post',
        })
    
    process.form = processForm
/**
* @see \App\Http\Controllers\Admin\ClassPromotionController::bulk
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:158
 * @route '/admin/class-promotions/{classGroup}/bulk'
 */
export const bulk = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulk.url(args, options),
    method: 'post',
})

bulk.definition = {
    methods: ["post"],
    url: '/admin/class-promotions/{classGroup}/bulk',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ClassPromotionController::bulk
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:158
 * @route '/admin/class-promotions/{classGroup}/bulk'
 */
bulk.url = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { classGroup: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { classGroup: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    classGroup: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        classGroup: typeof args.classGroup === 'object'
                ? args.classGroup.id
                : args.classGroup,
                }

    return bulk.definition.url
            .replace('{classGroup}', parsedArgs.classGroup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClassPromotionController::bulk
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:158
 * @route '/admin/class-promotions/{classGroup}/bulk'
 */
bulk.post = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulk.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ClassPromotionController::bulk
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:158
 * @route '/admin/class-promotions/{classGroup}/bulk'
 */
    const bulkForm = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulk.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ClassPromotionController::bulk
 * @see app/Http/Controllers/Admin/ClassPromotionController.php:158
 * @route '/admin/class-promotions/{classGroup}/bulk'
 */
        bulkForm.post = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulk.url(args, options),
            method: 'post',
        })
    
    bulk.form = bulkForm
const classPromotions = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
process: Object.assign(process, process),
bulk: Object.assign(bulk, bulk),
}

export default classPromotions
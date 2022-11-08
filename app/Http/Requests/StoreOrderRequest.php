<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'itemOrder' => 'required|array',
            'itemOrder.*.book_id' => 'required|integer|exists:book,id',
            'itemOrder.*.quantity' => 'required|integer|between:1,8',
        ];
    }
    public function failedValidation($validator)
    {
        $errors = $validator->errors();
        $newErrors = [];
        foreach ($errors->get('itemOrder.*.book_id') as $error) {
            $newErrors['book_id'][] = $error;
        }
        $newErrors['quantity'] = $errors->get('itemOrder.*.quantity');

        $response = response()->json([
            'message' => 'The given data was invalid.',
            'errors' => $newErrors,
        ], 422);
        throw new \Illuminate\Validation\ValidationException($validator, $response);
    }
  
}
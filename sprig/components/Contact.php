<?php

namespace sprig\components;

use Craft;
use craft\elements\Entry;

use putyourlightson\sprig\base\Component;

use yii\base\DynamicModel;

class Contact extends Component
{

  public $name;
  public $email;
  public $message;
  public $notforhumans;

  public $nameError;
  public $emailError;
  public $messageError;

  public $errors;
  public $responseMessage;

  protected $_template = '_sprig/contact';

  public function sendMessage()
  {

    $isValidated = $this->_validateFields();
    
    if($isValidated)
    {

      $successMessage = "Thanks for getting in touch. I can't wait to connect with you!";
      $errorMessage = "Either you're a robot or I messed something up! Feel free to email me or ridicule me on Twitter!";

      if($this->notforhumans == ''){
        $messageSaved = $this->_saveEntry();
        $messageSaved ?  $this->responseMessage = $successMessage : $this->responseMessage = $errorMessage;
        return $messageSaved;
      } else {
        $this->responseMessage = $successMessage;
        return true;
      }

      $this->_clearFields();
    }

  }

    /**
   * @return bool
   * @throws \yii\base\InvalidConfigException
   */
  protected function _validateFields(): bool
  {
    $model = DynamicModel::validateData(
      [
        'name' => $this->name,
        'email' => $this->email,
        'message' => $this->message
      ],
      [
        [['name', 'email', 'message'], 'required'],
        ['email', 'email'],
        [['name', 'message'],'string', 'max' => 500]
      ]
    );

    if ($model->hasErrors()) {
      $this->errors = $model->getErrors();
      
      $this->nameError = $this->errors['name'] ?? '';
      $this->emailError = $this->errors['email'] ?? '';
      $this->messageError = $this->errors['message'] ?? '';

      return false;
    }

    $this->errors = [];
    $this->responseMessage = '';
    return true;
  }

  private function _saveEntry(): bool
  {
    // create a new craft entry object
    $entry = new Entry();
   
    // assign new entry object with values for form submission section
    $entry->sectionId = 7;
    $entry->typeId = 8;
    $entry->enabled = true;
    $entry->title = $this->name;

    // write custom fields to new entry
    $entry->setFieldValues([
      'nameInput' => $this->name,
      'emailInput' => $this->email,
      'message' => $this->message
    ]);

    $success = Craft::$app->elements->saveElement($entry);
    return $success;
  }

  private function _clearFields()
  {
    $this->name = '';
    $this->email = '';
    $this->message = '';
  }
}
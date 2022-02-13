<?php
/*
 * Author: Stefan Sander <mail@stefan-sander.online>
 */

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Console\Question\Question;
use App\Entity\Installer;
#[AsCommand(
    name: 'app:install',
    description: 'install dependencies, set up database, jwt keypairs and assets',
)]
class AppInstall extends Command
{    
  public function __construct(ValidatorInterface $validator) {
    parent::__construct();
    $this->validator = $validator;
  }
  private function askFor($name) {
    $value = $this->io->ask($name,$this->installer->__get($name));
    $oldValue = $this->installer->__get($name);
    $this->installer->__set($name,$value);
    $errors = $this->validator->validate($this->installer);
    if (count($errors) > 0) {

        $this->io->write((string) $errors);
        $this->installer->__set($name,$oldValue);
        return $this->askFor($name);
    }
    return $value;
  }
    protected function execute(InputInterface $input, OutputInterface $output): int
    {       
      $this->io= new SymfonyStyle($input, $output);  
      $this->installer = new Installer(
        'http://localhost',
        'ws://localhost:8080',
        'mysql://root:password@localhost:3306'
      ); 

      $str = 'SERVER_URL='.$this->askFor('ServerUrl') . "\n";
      $str .= 'WEBSOCKET_URL='.$this->askFor('WebsocketUrl') . "\n";
      $str .= 'DATABASE_URL='.$this->askFor('DatabaseUrl') . "\n";
      file_exists(__DIR__.'/../../.env.local')?unlink(__DIR__.'/../../.env.local'):null;
      file_put_contents(__DIR__.'/../../.env.local', $str);
        return Command::SUCCESS;
    }
}